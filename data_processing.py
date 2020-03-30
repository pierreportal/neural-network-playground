# import random
# import numpy as np


# def preprocessing(json_data):

#     full_data = [{"x1": data[0], "x2":data[1], "y":data[2]}
#                  for data in json_data]

#     random.shuffle(full_data)

#     features = np.array([[data["x1"], data["x2"]] for data in full_data])

#     labels = [data["y"]
#               for data in full_data]

#     return features, labels
