from typing import Dict

import numpy as np


def compute_statistics(json_data: Dict, training: bool = False):
    key = "train" if training else "predict"
    for feature in json_data.get("features", []):
        if json_data["features"][feature]["type"] in {"int", "float", "bool"}:
            values = json_data["features"][feature][key]["values"]
            json_data["features"][feature][key]["mean"] = np.nanmean(values)
            json_data["features"][feature][key]["std"] = np.nanstd(values)
            histogram_w_arrays = np.histogram(values)
            histogram_w_lists = (histogram_w_arrays[0].tolist(), histogram_w_arrays[1].tolist())
            json_data["features"][feature][key]["hist"] = histogram_w_lists
            json_data["features"][feature][key]["nb_nan"] = sum(np.isnan(values))
