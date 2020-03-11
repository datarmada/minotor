from typing import Dict

import numpy as np


def compute_statistics(json_data: Dict, training: bool = False):
    phase = "train" if training else "infer"
    for feature in json_data.get("features", []):
        if json_data["features"][feature]["type"] in {"int", "float", "bool"}:
            values = json_data["features"][feature][phase]["values"]
            json_data["features"][feature][phase]["mean"] = np.nanmean(values)
            json_data["features"][feature][phase]["std"] = np.nanstd(values)
            histogram_w_arrays = np.histogram(values)
            histogram_w_lists = (histogram_w_arrays[0].tolist(), histogram_w_arrays[1].tolist())
            json_data["features"][feature][phase]["hist"] = histogram_w_lists
            json_data["features"][feature][phase]["nb_nan"] = sum(np.isnan(values))
