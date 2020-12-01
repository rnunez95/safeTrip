import tensorflow as tf
import pandas as pd
import numpy as np
#import tensorflow_datasets as tfds
import csv

data_size = 1000
data={'age':list(np.random.randint(0,110,size=data_size,dtype=float32)), 
	  'numPreExstCond':list(np.random.randint(0,4,size=data_size,dtype=float32)), 
	  'numLocVisits':list(np.random.randint(0,50,size=data_size,dtype=float32)), 
	  'gender':list(np.random.choice(['M','F'],data_size)), 
	  'riskScore':list(np.random.randint(0,100,size=data_size,dtype=float32))}

df1 = pd.DataFrame.from_dict(data, dtype=np.float32)
print(df1)

# # Reading data from CSV file to pandas data frame
# data = pd.read_csv('safe_trip.csv', sep=",")

age = np.array(df1['age'], np.float32)
numPreExstCond = np.array(df1['numPreExstCond'], np.float32)
numLocVisists = np.array(df1['numLocVisits'], np.float32)
# gender encoding ('M' - 2.4 & 'F' - 1.0)
df1['gen_enc'] = df1['gender']
df1['gen_enc'].replace('M', 2.4, inplace=True)
df1['gen_enc'].replace('F', 1.0, inplace=True)
gender = np.array(df1['gen_enc'], np.float32)

# Reading values from csv file to dataframe
df1.to_csv('safe_trip.csv',index=False)

#Target
target = np.array(df1['riskScore'], np.float32)

print(age)
print(numPreExstCond)
print(numLocVisists)
print(gender)
print(target)

# Initialization of weights variable
weights = tf.Variable([5.0,5.0,5.0,5.0,5.0], np.float32)
print(weights.numpy())

# weights[4] is the bias
def linear_regression(weights, features):
	return weights[0]*features[0] + weights[1]*features[1] + weights[2]*features[2] + weights[3]*features[3] + weights[4]

def loss_function(weights, features, target):
	prediction = linear_regression(weights, features)
	#prediction = model(weights, features)
	return tf.keras.losses.huber(target, prediction)

# selection of Optimizer function (SGD - Stochastic Gradient Descent)
opt = tf.keras.optimizers.SGD(learning_rate=0.01, momentum=0.1)

# Batch processing (Training a linear model in batches) - Reduction in resource use		
for batch in pd.read_csv('safe_trip.csv', chunksize=100):
	features = [[],[],[],[]]
	features[0] = np.array(batch['age'], np.float32)
	features[1] = np.array(batch['numPreExstCond'], np.float32)
	features[2] = np.array(batch['numLocVisits'], np.float32)
	features[3] = np.array(batch['gen_enc'], np.float32)
	target = np.array(batch['riskScore'], np.float32)
	
	for i in range(100):
        # Loss function to be minimized using optimizer function
		opt.minimize(lambda: loss_function(weights, features, target), var_list=weights)
	
	print(loss_function(weights, features, target))

print(weights.numpy())	
# Testing the predicted risk score
score = linear_regression(weights, [[110.0],[4.0],[50.0],[2.4]]).numpy()
print(score)