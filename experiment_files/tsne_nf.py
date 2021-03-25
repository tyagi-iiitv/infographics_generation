import numpy as np
from sklearn.manifold import TSNE

data = np.load('y_pca_test.npy')
tsne = TSNE(n_components = 2)
data_two = tsne.fit_transform(data)
np.save('y_tsne_test.npy', data_two)
