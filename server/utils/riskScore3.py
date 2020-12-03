import tensorflow as tf
import pandas as pd
import numpy as np
import random
#import tensorflow_datasets as tfds
import csv
import DatabaseFunctions2 as db

# # Importing data from DB & Pre-processing
# conn = createConnection("safeTrip", "ST_Group", "safetripPass", "psql.moostermiko.com", "5432")
# age = []
# numPreExstCond = []
# numLocVisits = []
# gender = []
# riskScore = []
# # for iter in db.getUserDataForML(conn):
# #     age.append(iter['age']*0.2)
# #     numPreExstCond.append(iter['condcount']*5)
# #     numLocVisits.append(iter['risksum']*0.0012)
# #     gender.append(iter['gender'])

# for iter in db.getUserDataForML(conn):
#     age.append(iter['age'])
#     numPreExstCond.append(iter['condcount'])
#     numLocVisits.append(iter['risksum'])
#     gender.append(iter['gender'])
# conn.close()

# data = {'age':age,
#         'numPreExstCond':numPreExstCond,
#         'numLocVisits':numLocVisits,
#         'gender':gender,
#         'riskScore': list(np.random.randint(0,100,size=len(age),dtype=int))     #(np.array(age)*0.2+np.array(numPreExstCond)*5+np.array(numLocVisits)*0.0011).tolist()
#         }

# Training based on random number generation
data_size = 10000
data = {
    'age': list(np.random.randint(0, 110, size=data_size)),
    'numPreExstCond': list(np.random.randint(0, 4, size=data_size)),
    'numLocVisits': list(np.random.randint(0, 35000, size=data_size,
                                           dtype=int)),
    'gender': list(np.random.choice(['M', 'F'], data_size)),
    'riskScore': list(np.random.randint(0, 100, size=data_size))
}

##########################################################################################################################

df1 = pd.DataFrame.from_dict(data, dtype=np.float)
print(df1)

# # Reading data from CSV file to pandas data frame
# data = pd.read_csv('safe_trip.csv', sep=",")

age = np.array(df1['age'], np.int32)
numPreExstCond = np.array(df1['numPreExstCond'], np.float32)
numLocVisists = np.array(df1['numLocVisits'], np.float32)
# gender encoding ('M' - 2.4 & 'F' - 1.0)
df1['gen_enc'] = df1['gender']
df1['gen_enc'].replace('M', 2.4, inplace=True)
df1['gen_enc'].replace('F', 1.0, inplace=True)
gender = np.array(df1['gen_enc'], np.float32)

#Target
target = np.array(df1['riskScore'], np.float32)

# for i in range(50):
#     new_row1 = {'age':0, 'numPreExstCond':0.0, 'numLocVisits':0.0, 'gender':'F', 'gen_enc':1.0, 'riskScore':0.0}
#     new_row2 = {'age':0, 'numPreExstCond':0.0, 'numLocVisits':0.0, 'gender':'M', 'gen_enc':2.4, 'riskScore':0.0}
#     new_row3 = {'age':90, 'numPreExstCond':4.0, 'numLocVisits':30000*0.0015, 'gender':'M', 'gen_enc':2.4, 'riskScore':95}
#     new_row4 = {'age':100, 'numPreExstCond':3.0, 'numLocVisits':40000*0.0015, 'gender':'M', 'gen_enc':2.4, 'riskScore':95}
#     df1 = df1.append(new_row1, ignore_index=True)
#     df1 = df1.append(new_row2, ignore_index=True)
#     df1 = df1.append(new_row3, ignore_index=True)
#     df1 = df1.append(new_row4, ignore_index=True)

# for i in range(50):
# 	new_row1 = {'age':random.randint(0,10), 'numPreExstCond':random.randint(0,1), 'numLocVisits':random.randint(5,30), 'gender':'M', 'gen_enc':2.4, 'riskScore':random.uniform(0,15)}
# 	new_row2 = {'age':random.randint(0,10), 'numPreExstCond':random.randint(0,1), 'numLocVisits':random.randint(5,30), 'gender':'F', 'gen_enc':1.0, 'riskScore':random.uniform(0,15)}
# 	new_row3 = {'age':random.randint(85,110), 'numPreExstCond':random.randint(1,4), 'numLocVisits':random.randint(10,50), 'gender':'M', 'gen_enc':2.4, 'riskScore':random.uniform(50,100)}
# 	new_row4 = {'age':random.randint(85,110), 'numPreExstCond':random.randint(1,4), 'numLocVisits':random.randint(10,50), 'gender':'F', 'gen_enc':1.0, 'riskScore':random.uniform(50,100)}
# 	df1 = df1.append(new_row1, ignore_index=True)
# 	df1 = df1.append(new_row2, ignore_index=True)
# 	df1 = df1.append(new_row3, ignore_index=True)
# 	df1 = df1.append(new_row4, ignore_index=True)

# Reading values from csv file to dataframe
df1.to_csv('safe_trip.csv', index=False)

##########################################################################################################################

# Initialization of weights variable
weights = tf.Variable([1.0, 1.0, 1.0, 1.0, 1.0], np.float32)
print(weights.numpy())


# weights[4] is the bias
def linear_regression(weights, features):
    return weights[0] * features[0] + weights[1] * features[1] + weights[
        2] * features[2] + weights[3] * features[3] + weights[4]


def loss_function(weights, features, target):
    prediction = linear_regression(weights, features)
    #prediction = model(weights, features)
    return tf.keras.losses.huber(target, prediction)


# selection of Optimizer function (SGD - Stochastic Gradient Descent)
opt = tf.keras.optimizers.SGD(learning_rate=0.01, momentum=0.01)

# Batch processing (Training a linear model in batches) - Reduction in resource use
for batch in pd.read_csv('safe_trip.csv', chunksize=1000):
    features = [[], [], [], []]
    features[0] = np.array(batch['age'], np.float32) * 0.2
    features[1] = np.array(batch['numPreExstCond'], np.float32) * 5
    features[2] = np.array(batch['numLocVisits'], np.float32) * 0.0015
    features[3] = np.array(batch['gen_enc'], np.float32)
    target = np.array(batch['riskScore'], np.float32)

    for i in range(100):
        # Loss function to be minimized using optimizer function
        opt.minimize(lambda: loss_function(weights, features, target),
                     var_list=weights)

    print(loss_function(weights, features, target))

print(weights.numpy())
# Testing the predicted risk score
#score_max = linear_regression(weights, [[110.0*0.2],[4.0*5],[50000*0.0015],[2.4]]).numpy()
print(
    linear_regression(
        weights,
        [[110.0 * 0.2], [4.0 * 5], [50000 * 0.0015], [2.4]]).numpy()[0])
print(linear_regression(weights, [[0.0], [0.0], [0.0], [0.0]]).numpy()[0])

for i in range(20):
    a = random.randint(1, 100)
    b = random.randint(0, 4)
    c = random.randint(1, 50000)
    d = random.choice([1.0, 2.4])
    score = linear_regression(
        weights, [[a * 0.2], [b * 5], [c * 0.0015], [d]]).numpy()[0]
    print(
        "age: {}, #PreExistingConditions: {}, #LocationRiskScore: {}, Gender_Encoded: {} RiskScorePredicted: {}"
        .format(a, b, c, d, score))
