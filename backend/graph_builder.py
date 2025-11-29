# backend/app/graph_builder.py
from typing import Tuple

import torch

try:
    from torch_geometric.data import Data
except ImportError:
    Data = None  # type: ignore


def build_graph_from_cp_features(cp_features: dict | None) -> Tuple["Data", list[str]]:
    """
    Convert cyber-physical fused features into a PyG Data graph.

    For now, this builds a tiny synthetic graph with:
    - 5 nodes
    - random features
    - a simple chain topology

    Returns:
        data: torch_geometric.data.Data
        node_ids: list of string IDs for mapping back to NodeRisk
    """
    if Data is None:
        raise ImportError(
            "torch_geometric is not installed. Install it before building graphs."
        )

    # TODO: replace with real logic:
    # - create node features from your dataset (bus voltages, packet stats, etc.)
    # - edge_index from topology + cyber links
    num_nodes = 5
    in_channels = 8

    x = torch.randn(num_nodes, in_channels)  # fake features
    edge_index = torch.tensor(
        [
            [0, 1, 1, 2, 2, 3, 3, 4],
            [1, 0, 2, 1, 3, 2, 4, 3],
        ],
        dtype=torch.long,
    )

    data = Data(x=x, edge_index=edge_index)
    node_ids = [f"Node-{i+1}" for i in range(num_nodes)]

    return data, node_ids
