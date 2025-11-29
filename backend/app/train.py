import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# backend/train.py
import os
from pathlib import Path
from typing import Tuple

import torch
import torch.nn as nn
from torch.optim import Adam

from app.config import settings
from app.gnn import ChebGNN
from app.datasets import create_dummy_dataloaders


def train_one_epoch(
    model: ChebGNN,
    loader,
    optimizer: Adam,
    device: torch.device,
    criterion: nn.CrossEntropyLoss,
) -> float:
    model.train()
    total_loss = 0.0
    total_samples = 0

    for batch in loader:
        batch = batch.to(device)
        optimizer.zero_grad()

        # We treat each graph as separate:
        # batch.x shape: [total_nodes, in_channels]
        # batch.edge_index shape: [2, total_edges]
        # batch.y shape: [num_graphs]
        logits, _ = model(batch.x, batch.edge_index)  # logits: [1, out_channels]

        # Here we’re assuming 1 graph per batch (dummy dataset).
        # For real multi-graph minibatches, we’ll need graph batching logic.
        y = batch.y.view(-1)  # [1]
        loss = criterion(logits, y)

        loss.backward()
        optimizer.step()

        total_loss += loss.item() * y.size(0)
        total_samples += y.size(0)

    return total_loss / max(total_samples, 1)


@torch.no_grad()
def eval_one_epoch(
    model: ChebGNN,
    loader,
    device: torch.device,
    criterion: nn.CrossEntropyLoss,
) -> Tuple[float, float]:
    model.eval()
    total_loss = 0.0
    total_samples = 0
    correct = 0

    for batch in loader:
        batch = batch.to(device)

        logits, _ = model(batch.x, batch.edge_index)  # [1, out_channels]
        y = batch.y.view(-1)

        loss = criterion(logits, y)
        total_loss += loss.item() * y.size(0)
        total_samples += y.size(0)

        preds = logits.argmax(dim=-1)
        correct += (preds == y).sum().item()

    avg_loss = total_loss / max(total_samples, 1)
    acc = correct / max(total_samples, 1)
    return avg_loss, acc


def main():
    device = torch.device(settings.device)
    print(f"Using device: {device}")

    # For now we sync with DummyCPSDataset in_channels
    in_channels = 8
    out_channels = 2

    train_loader, val_loader = create_dummy_dataloaders(
        batch_size=16,
        train_samples=800,
        val_samples=200,
        num_nodes=10,
        in_channels=in_channels,
    )

    model = ChebGNN(in_channels=in_channels, hidden_channels=32, out_channels=out_channels, K=3)
    model.to(device)

    optimizer = Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)
    criterion = nn.CrossEntropyLoss()

    best_val_loss = float("inf")
    artifacts_dir = Path("artifacts")
    artifacts_dir.mkdir(parents=True, exist_ok=True)
    ckpt_path = artifacts_dir / "cheb_gnn.pt"

    num_epochs = 5  # make small just to test pipeline

    for epoch in range(1, num_epochs + 1):
        train_loss = train_one_epoch(model, train_loader, optimizer, device, criterion)
        val_loss, val_acc = eval_one_epoch(model, val_loader, device, criterion)

        print(
            f"[Epoch {epoch:02d}] "
            f"Train Loss: {train_loss:.4f} | "
            f"Val Loss: {val_loss:.4f} | "
            f"Val Acc: {val_acc*100:.2f}%"
        )

        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(
                {
                    "model_state_dict": model.state_dict(),
                    "epoch": epoch,
                    "val_loss": val_loss,
                    "val_acc": val_acc,
                },
                ckpt_path,
            )
            print(f"  -> New best model saved to {ckpt_path}")

    print("Training complete.")


if __name__ == "__main__":
    main()
