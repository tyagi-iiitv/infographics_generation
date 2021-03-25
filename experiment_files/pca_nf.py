import numpy as np
import pandas as pd
from sklearn.decomposition import PCA


data = np.load('y_test_hd.npy')
print('data_loaded')
# data_short = data[np.random.choice(data.shape[0], 1500, replace=False)]
data_short = data
print(data.shape)
pca = PCA(n_components = 50)
pca.fit(data_short)
data_pca = pca.transform(data)
np.save('y_pca_test.npy', data_pca)
