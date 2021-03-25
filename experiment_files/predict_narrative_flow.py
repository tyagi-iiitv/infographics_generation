import numpy as np
from os import listdir
from os import path
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
import pytesseract

# Generating X_train and y_train
X_train = [] #[Titles, Avg len, Texts, Avg Len, Icons, Avg Width, Avg Height]
y_train = []
eps = 1e-9
counter = 0
train_imgs = listdir('4300_infographics/images/train/')
test_imgs = listdir('4300_infographics/images/test/')
for x in test_imgs:
    X_temp = [0]*7
    img_name = '4300_infographics/images/test/' + x
    label_name = '4300_infographics/labels/test/' + x[:-4] + '.txt'
    bb = pd.read_csv(label_name, delimiter=' ', header=None)
    data = np.array(plt.imread(img_name))
    h = data.shape[0]
    w = data.shape[1]
    counter += 1
    print(counter)
    for row in bb.values[:,:]:
        label = row[0]
        if label == 35:
            dim = row[1:]
            y1 = dim[1]*h - (dim[3]*h)/2
            y2 = dim[1]*h + (dim[3]*h)/2
            x1 = dim[0]*w - (dim[2]*w)/2
            x2 = dim[0]*w + (dim[2]*w)/2
            width, height = x2-x1, y2-y1
            patch_img = data[int(y1):int(y2), int(x1):int(x2)]
            # cv2_imshow(patch_img)
            text = pytesseract.image_to_string(patch_img)
            X_temp[2] += 1
            X_temp[3] += len(text)
        elif label == 37:
            dim = row[1:]
            y1 = dim[1]*h - (dim[3]*h)/2
            y2 = dim[1]*h + (dim[3]*h)/2
            x1 = dim[0]*w - (dim[2]*w)/2
            x2 = dim[0]*w + (dim[2]*w)/2
            width, height = x2-x1, y2-y1
            patch_img = data[int(y1):int(y2), int(x1):int(x2)]
            # cv2_imshow(patch_img)
            text = pytesseract.image_to_string(patch_img)
            X_temp[0] += 1
            X_temp[1] += len(text)
        elif label == 36:
            dim = row[1:]
            y1 = dim[1]*h - (dim[3]*h)/2
            y2 = dim[1]*h + (dim[3]*h)/2
            x1 = dim[0]*w - (dim[2]*w)/2
            x2 = dim[0]*w + (dim[2]*w)/2
            width, height = x2-x1, y2-y1
            patch_img = data[int(y1):int(y2), int(x1):int(x2)]
            X_temp[4] += 1
            X_temp[5] += width/w
            X_temp[6] += height/h
    X_temp[1] = X_temp[1]/(X_temp[0]+eps)
    X_temp[3] = X_temp[3]/(X_temp[2]+eps)
    X_train.append(X_temp)
    # print(X_train)

np.save('X_test_nf.npy', X_train)
