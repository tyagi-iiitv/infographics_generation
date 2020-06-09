import numpy as np
from sklearn.cluster import KMeans

data = np.load('y_tsne.npy')
data_tst = np.load('y_tsne_test.npy')
kmeans = KMeans(n_clusters=12)
kmeans.fit(data)
labels = kmeans.predict(data_tst)
np.save('y_test.npy', labels)