# backend/app/datasets.py
from typing import List, Tuple
import torch

try:
    from torch_geometric.data import Data
    from torch_geometric.loader import DataLoader
except ImportError:
    Data = None  # type: ignore
    DataLoader = None  # type: ignore


class DummyCPSDataset(torch.utils.data.Dataset):
    """
    Temporary dataset to get the ChebGNN training loop working.

    Later:
    - Replace with real CP-fusion dataset loader.
    - Each sample: graph (x, edge_index) + label (0=BENIGN, 1=MALICIOUS).
    """

    def __init__(self, num_samples: int = 1000, num_nodes: int = 10, in_channels: int = 8):
        if Data is None:
            raise ImportError(
                "torch_geometric is required for DummyCPSDataset. "
                "Install torch_geometric first."
            )
        self.num_samples = num_samples
        self.num_nodes = num_nodes
        self.in_channels = in_channels

    def __len__(self) -> int:
        return self.num_samples

    def __getitem__(self, idx: int) -> "Data":
        # Random graph for now
        x = torch.randn(self.num_nodes, self.in_channels)

        # Simple chain graph
        edge_index = torch.tensor(
            [
                [i for i in range(self.num_nodes - 1)] + [i + 1 for i in range(self.num_nodes - 1)],
                [i + 1 for i in range(self.num_nodes - 1)] + [i for i in range(self.num_nodes - 1)],
            ],
            dtype=torch.long,
        )

        # Random binary label: 0=benign, 1=malicious
        y = torch.randint(0, 2, (1,), dtype=torch.long)

        return Data(x=x, edge_index=edge_index, y=y)


def create_dummy_dataloaders(
    batch_size: int = 16,
    train_samples: int = 800,
    val_samples: int = 200,
    num_nodes: int = 10,
    in_channels: int = 8,
) -> Tuple["DataLoader", "DataLoader"]:
    if DataLoader is None:
        raise ImportError(
            "torch_geometric is required for DataLoader. Install torch_geometric first."
        )

    train_ds = DummyCPSDataset(num_samples=train_samples, num_nodes=num_nodes, in_channels=in_channels)
    val_ds = DummyCPSDataset(num_samples=val_samples, num_nodes=num_nodes, in_channels=in_channels)

    # backend/app/datasets.py

def create_dummy_dataloaders(
    batch_size: int = 16,           # you can leave this arg, we’ll ignore it
    train_samples: int = 800,
    val_samples: int = 200,
    num_nodes: int = 10,
    in_channels: int = 8,
):
    if DataLoader is None:
        raise ImportError(
            "torch_geometric is required for DataLoader. Install torch_geometric first."
        )

    train_ds = DummyCPSDataset(
        num_samples=train_samples,
        num_nodes=num_nodes,
        in_channels=in_channels,
    )
    val_ds = DummyCPSDataset(
        num_samples=val_samples,
        num_nodes=num_nodes,
        in_channels=in_channels,
    )

    # IMPORTANT: batch_size=1 so model output & labels match
    train_loader = DataLoader(train_ds, batch_size=1, shuffle=True)
    val_loader = DataLoader(val_ds, batch_size=1, shuffle=False)

    return train_loader, val_loader


    