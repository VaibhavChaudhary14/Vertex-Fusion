# backend/app/gnn.py
from typing import Optional

import torch
import torch.nn as nn

try:
    from torch_geometric.nn import ChebConv
    from torch_geometric.data import Data
except ImportError:
    # Allow imports even if torch_geometric isn't installed yet
    ChebConv = None  # type: ignore
    Data = None      # type: ignore


class ChebGNN(nn.Module):
    """
    Minimal Chebyshev GNN architecture skeleton inspired by the paper.
    You will later tune hidden sizes, K-order, and output size based on your dataset.
    """

    def __init__(
        self,
            in_channels: int,
            hidden_channels: int = 32,
            out_channels: int = 2,  # binary classification: BENIGN vs MALICIOUS
            K: int = 3,
    ):
        super().__init__()
        if ChebConv is None:
            raise ImportError(
                "torch_geometric is not installed. Install it before using ChebGNN."
            )

        self.conv1 = ChebConv(in_channels, hidden_channels, K)
        self.conv2 = ChebConv(hidden_channels, hidden_channels, K)
        self.lin = nn.Linear(hidden_channels, out_channels)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(p=0.2)

    def forward(self, x, edge_index):
        # x: [num_nodes, in_channels]
        # edge_index: [2, num_edges]
        h = self.conv1(x, edge_index)
        h = self.relu(h)
        h = self.dropout(h)

        h = self.conv2(h, edge_index)
        h = self.relu(h)
        h = self.dropout(h)

        # Simple global average pooling
        h_mean = h.mean(dim=0, keepdim=True)  # [1, hidden_channels]
        out = self.lin(h_mean)  # [1, out_channels]
        return out, h  # return logits + node embeddings
