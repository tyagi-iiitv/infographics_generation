import numpy as np
from os import listdir
from os import path
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
from skimage import color
from skimage.transform import resize
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
import itertools
import math
import os
import signal
import cv2


class VIFflow():
    def formEleset(file_path):
        #print(1)
        f = open(file_path, "r")
        line = f.readline()
        temp = line.split()
        for i in range(len(temp)):
            temp[i] = float(temp[i])
        eleSet = [temp]
        while line:
            line = f.readline()
            temp = line.split()
            for i in range(len(temp)):
                temp[i] = float(temp[i])
            eleSet.append(temp)
        while [] in eleSet:
            eleSet.remove([])
        f.close()
        return eleSet

    def selectSeeds(eleSet):
        #print(2)
        # #print("start selectSeeds")
        seedsDict = {}
        similarity_coefficient = 0.85
        least_allies = 2
        has_num = False
        has_letter = False
        has_bodytext = False
        has_icon = False

        def isSimilar(temp_seed, i):
            #print(3)
            return (1 - max(abs(temp_seed[3] - i[3]), abs(temp_seed[4] - i[4]))) > similarity_coefficient

        # choose seeds
        for temp_seed in eleSet:
            if 0 <= temp_seed[0] <= 19:  # is number
                if not has_num:
                    # #print("is number")
                    has_num = True
                    seedsDict[tuple(temp_seed)] = []
                    # find allies
                    for i in eleSet:
                        if 0 <= i[0] <= 19 and i != temp_seed and isSimilar(temp_seed, i):
                            seedsDict[tuple(temp_seed)].append(tuple(i))
                    if len(seedsDict[tuple(temp_seed)]) < least_allies:
                        del seedsDict[tuple(temp_seed)]
                        has_bodytext = False
            elif 20 <= temp_seed[0] <= 26:  # is letter
                if not has_letter:
                    # #print("is letter")
                    has_letter = True
                    seedsDict[tuple(temp_seed)] = []
                    # find allies
                    for i in eleSet:
                        if 20 <= i[0] <= 26 and i != temp_seed and isSimilar(temp_seed, i):
                            seedsDict[tuple(temp_seed)].append(tuple(i))
                    if len(seedsDict[tuple(temp_seed)]) < least_allies:
                        del seedsDict[tuple(temp_seed)]
                        has_bodytext = False
            elif temp_seed[0] == 35:  # is bodytext
                if not has_bodytext:
                    # #print("is bodytext")
                    has_bodytext = True
                    seedsDict[tuple(temp_seed)] = []
                    # find allies
                    for i in eleSet:
                        if i[0] == 35 and i != temp_seed and isSimilar(temp_seed, i):
                            seedsDict[tuple(temp_seed)].append(tuple(i))
                    if len(seedsDict[tuple(temp_seed)]) < least_allies:
                        del seedsDict[tuple(temp_seed)]
                        has_bodytext = False
            elif temp_seed[0] == 36:  # is icon
                if not has_icon:
                    # #print("is icon")
                    has_icon = True
                    seedsDict[tuple(temp_seed)] = []
                    # find allies
                    for i in eleSet:
                        if i[0] == 36 and i != temp_seed and isSimilar(temp_seed, i):
                            seedsDict[tuple(temp_seed)].append(tuple(i))
                    if len(seedsDict[tuple(temp_seed)]) < least_allies:
                        del seedsDict[tuple(temp_seed)]
                        has_bodytext = False
        # #print(list(seedsDict))
        # #print("end selectSeeds\n")
        return seedsDict

    def calculateRegularity(path):  # calculate the regularity of a path
        # #print(4)  
        # #print(len(path))
        S = [[], [], [], []]
        for i in range(len(path) - 1):
            #print("four",i)
            # line segment lengths
            S[0].append(math.sqrt(
                (path[i + 1][1] - path[i][1]) * (path[i + 1][1] - path[i][1]) + (path[i + 1][2] - path[i][2]) * (
                        path[i + 1][2] - path[i][2])))
            # adjacent horizontal shifts
            S[1].append(abs(path[i + 1][1] - path[i][1]))
            # adjacent vertical shifts
            S[2].append(abs(path[i + 1][2] - path[i][2]))
        if len(path) > 3:
            for i in range(len(path) - 2):
                #print("four2",i)
                # turning angles and standardize
                angle1 = math.atan2(path[i][2] - path[i + 1][2], path[i][1] - path[i + 1][1])
                angle2 = math.atan2(path[i + 2][2] - path[i + 1][2], path[i + 2][1] - path[i + 1][1])
                angle = abs(angle1 - angle2)
                if angle > math.pi:
                    angle = 2 * math.pi - angle
                S[3].append(angle / math.pi)
            # regularity = 1 - min(np.std(S[0]), np.std(S[1]), np.std(S[2])) - np.std(S[3])
            regularity = 1 - np.std(S[0]) - np.std(S[3])
            # regularity = 1 - min(np.std(S[0]), np.std(S[1]), np.std(S[2]), np.std(S[3]))
        else:
            regularity = 1 - np.std(S[0])
            # regularity = 1 - min(np.std(S[0]), np.std(S[1]), np.std(S[2]), np.std(S[3]))
        return regularity

    # @staticmethod
    def traceFlow(seedAllies):
        #print(5)
        #print(len(seedAllies))
        if len(seedAllies) > 8:
            raise Exception
        # let the number path and letter path try first (index priority)
        if (0 <= seedAllies[0][0] <= 26):
            possible_path = sorted(seedAllies, key=lambda item: item[0])
            score = VIFflow.calculateRegularity(possible_path)
            if score > 0.99:
                return possible_path

        # find some candidates path (the shortest some path)
        all_paths = list(itertools.permutations(seedAllies, len(seedAllies)))
        if len(seedAllies) == 8:
            path_num = math.factorial(len(seedAllies) - 2)
        elif 6 <= len(seedAllies) <= 7:
            path_num = math.factorial(len(seedAllies) - 1)
        elif len(seedAllies) == 5:
            path_num = math.factorial(len(seedAllies)) / 2
        else:
            path_num = math.factorial(len(seedAllies))
        temp = {}
        for p in all_paths:
            # calculate the distance
            temp_distance = 0
            for i in range(len(p) - 1):
                temp_distance = temp_distance + math.sqrt(
                    (p[i + 1][1] - p[i][1]) * (p[i + 1][1] - p[i][1]) + (p[i + 1][2] - p[i][2]) * (
                            p[i + 1][2] - p[i][2]))
            # find the shortest some path
            if len(temp) < path_num:
                temp[p] = temp_distance
            elif temp_distance < max(list(temp.values())):
                del temp[
                    list(temp.keys())[list(temp.values()).index(max(list(temp.values())))]]  # delete the longest path
                temp[p] = temp_distance
        paths = list(temp)

        # given the paths, work on regularity   
        regularitys = {}
        for path in paths:
            regularitys[path] = VIFflow.calculateRegularity(path)
        good_path = (sorted(regularitys, key=lambda item: regularitys[item], reverse=True))[0]

        # given the good path, work on common reading order(decide which end to start)
        good_path = list(good_path)
        # 如果起点在终点比终点低0.1
        if good_path[0][2] - good_path[-1][2] > 0.1:  #
            list.reverse(good_path)
        return good_path

    # @staticmethod
    def composeGroups(temp_flow, seed_allies, ele_set):
        #print(6)
        # work on proximity
        delta_max_h = 0.31  # delta is δ
        delta_max_v = 0.31
        delta_max_n = 0.25
        v_or_h = 0.08
        K = 3
        pos_x = []
        pos_y = []
        vgroups = {}
        for node in temp_flow:
            pos_x.append(node[1])
            pos_y.append(node[2])
            vgroups[node] = []

        # copy a ele_set
        ele_set_copy = ele_set.copy()
        # remove the Title and the elements that is in temp_flow
        for ele in ele_set:
            if not 0 <= ele[0] <= 36 or tuple(ele) in temp_flow:
                ele_set_copy.remove(ele)

        if np.std(pos_y) < v_or_h:  # oriented horizontally
            # #print("oriented horizontally")
            for node in temp_flow:
                temp_group = []
                for ele in ele_set:
                    if node[2] - delta_max_h < ele[2] < node[2] + delta_max_h and node[1] - \
                            node[3] / 2 < ele[1] < node[1] + \
                            node[3] / 2 and tuple(ele) not in temp_flow and ele[0] != 37:
                        temp_group.append((ele, abs(ele[2] - node[2])))
                list.sort(temp_group, key=lambda item: item[1])
                while len(temp_group) > K:
                    temp_group.pop()
                if temp_group:
                    vgroups[node] = [x[0] for x in temp_group]
                else:
                    vgroups[node] = temp_group
        elif np.std(pos_x) < v_or_h:  # oriented vertically
            # #print("oriented vertically")
            for node in temp_flow:
                temp_group = []
                for ele in ele_set:
                    if node[1] - delta_max_v < ele[1] < node[1] + delta_max_v and node[2] - \
                            node[4] / 2 < ele[2] < node[2] + \
                            node[4] / 2 and tuple(ele) not in temp_flow and ele[0] != 37:
                        temp_group.append((ele, abs(ele[1] - node[1])))
                list.sort(temp_group, key=lambda item: item[1])
                while len(temp_group) > K:
                    temp_group.pop()
                if temp_group:
                    vgroups[node] = [x[0] for x in temp_group]
                else:
                    vgroups[node] = temp_group
        else:  # normal occasion
            # #print("normal occasion")
            i = 0
            while i < K and ele_set_copy:
                i += 1
                for node in temp_flow:
                    temp_nearest = ()
                    shortest_dis = delta_max_n
                    for ele in ele_set_copy:
                        temp_dis = math.sqrt(
                            (node[1] - ele[1]) * (node[1] - ele[1]) + (node[2] - ele[2]) * (node[2] - ele[2]))
                        if temp_dis < shortest_dis:
                            shortest_dis = temp_dis
                            temp_nearest = ele
                    if temp_nearest != ():
                        vgroups[node].append(temp_nearest)
                        ele_set_copy.remove(temp_nearest)
        return vgroups

    # @staticmethod
    def guessElements(temp_flow, ele_set):
        #print(7)
        new_allies = []

        return new_allies

    # @staticmethod
    def scoreFlows(flow, temp_flow):
        #print(8)
        if flow != []:
            score_flow = VIFflow.calculateRegularity(flow)
            score_temp_flow = VIFflow.calculateRegularity(temp_flow)
            if score_temp_flow > score_flow:
                flow = temp_flow
        else:
            flow = temp_flow

        return flow

    # @staticmethod
    def extract(file_path):
        #print(9)
        """

        :param file_path: file path of bounding box
        :return: flow, and vgroup_list
        """
        vgroup_list = {}
        ele_set = VIFflow.formEleset(file_path)
        seeds_dict = VIFflow.selectSeeds(ele_set)
        if seeds_dict == {}:
            #print("can not find seeds in this picture")
            return None, None
        seeds_list = list(seeds_dict)
        list.sort(seeds_list, key=lambda item: item[0])  # the number and letter try first
        flow = []
        # top
        while len(seeds_list) > 0:
            seed = seeds_list.pop(0)
            seed_allies = [seed] + seeds_dict[seed]
            # loop
            while True:
                temp_flow = VIFflow.traceFlow(seed_allies)
                # the number and letter go first
                if 0 <= temp_flow[0][0] <= 26 and VIFflow.calculateRegularity(temp_flow) > 0.99:
                    # vgroup_list = VIFflow.composeGroups(flow, seed_allies, ele_set)
                    return temp_flow, vgroup_list
                new_allies = VIFflow.guessElements(temp_flow, ele_set)
                if len(new_allies) == 0:
                    flow = VIFflow.scoreFlows(flow, temp_flow)
                    break
                seed_allies = seed_allies + new_allies
        # vgroup_list = VIFflow.composeGroups(flow, seed_allies, ele_set)
        return flow, vgroup_list

    # @staticmethod
    def generateGraph(bb_file, img):
        #print(10)
        """

        :param bb_file: file path of bounding box
        :param img: image read by cv2
        :return: flow, vgroup_list, and an image with backbone
        """
        flow, vgroup_list = VIFflow.extract(bb_file)
        height, width = img.shape[0], img.shape[1]
        black = np.zeros((height, width, 3), np.uint8)

        for i in range(len(flow)):
            cv2.circle(black, (int(flow[i][1] * width), int(flow[i][2] * height)), 5, (0, 0, 255), -1)

        for i in range(len(flow) - 1):
            cv2.line(black, (int(flow[i][1] * width), int(flow[i][2] * height)),
                     (int(flow[i + 1][1] * width), int(flow[i + 1][2] * height)), (255, 0, 0), 30)
        return flow, vgroup_list, black


def handler(signum, frame):
    raise Exception


train_imgs = listdir('4300_infographics/images/train/')
test_imgs = listdir('4300_infographics/images/test')

# with open('y_train.txt', 'a') as file:
#     file.write("0\n")
#     file.write("0\n")

# count = len(open('y_train.txt').readlines(  ))

y_train = np.zeros([len(test_imgs), 490000], dtype=np.uint8)
for i,x in enumerate(test_imgs):
    # if i < count:
    #     continue
    img_name = '4300_infographics/images/test/' + x
    label_name = '4300_infographics/labels/test/' + x[:-4] + '.txt'    
    print(i, img_name)
    # bb = pd.read_csv(label_name, delimiter=' ', header=None)
    data = cv2.imread(img_name)
    signal.signal(signal.SIGALRM, handler)
    signal.alarm(10)
    try:
        _,_,nflow = VIFflow.generateGraph(label_name, data)
    except:
        # file.write("0\n")
        continue
    #print('a')
    nflow = nflow[:,:,0]
    #print('b')
    nflow = resize(nflow, (700,700), preserve_range=True)
    #print('c')
    nflow = np.reshape(nflow, -1)
    y_train[i,:] = nflow
    #print('d')
    print(nflow.shape)

    # for value in nflow:
    #     file.write("%i " %value)
    # file.write("\n")
        #print('e')
        # y_train[i,:] = nflow
np.save('y_test_hd.npy', y_train)
# np.save('ignore_files.npy', ignored_files)
    

