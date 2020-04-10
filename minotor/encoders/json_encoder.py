import json

from minotor.encoders.json_encoder_library import ENCODERS


class ExtendedJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        for instance, func in ENCODERS:
            if isinstance(obj, instance):
                return func(obj)
        return super(ExtendedJSONEncoder, self).default(obj)
