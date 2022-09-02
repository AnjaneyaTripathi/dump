

import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.model_selection import GridSearchCV
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.compose import ColumnTransformer
import warnings

warnings.filterwarnings('ignore')

#for loading the dataset as well as model
def input_dataset(name):
    data = pd.read_csv(name + '.csv')
    return data

#drop a column if number of missing values is greater than 80%
def drop_cols(data):
    print('dropping columns if more than 80% are missing')
    data.dropna(axis=1, thresh=data_length*0.8, inplace=True)
    return data

#displays those columns that are of type float64
def diff_num_types(data):
    for(colName, colData) in data.iteritems():
        datatype = colData.dtype
        if(datatype == 'float64' or datatype == 'int64'):
            print(colName)

#performed only on columns with numeric values
def imputation(data, num_list): 
    x = 0
    y = 0
    for(colName, colData) in data.iteritems():
        datatype = colData.dtype
        if(datatype == 'float64' or datatype == 'int64'):
            if(num_list[x] == 'CODE'):
                data = impute_mode(y, data)
            else:
                data = impute_avg(y, data)
            x = x + 1
        elif(datatype == 'O'):
            print('Dropped ' + colName)
        y = y + 1
    print('imputation performed on the dataset')
    return data
    
#function to impute average (for absolute values)
def impute_avg(y, data):
    print('imputing missing data with average ' + str(y))
    imputer = SimpleImputer(missing_values=np.nan, strategy='mean')
    imputer = imputer.fit(data.iloc[:, y:y+1])
    data.iloc[:, y:y+1] = imputer.transform(data.iloc[:, y:y+1])
    return data
 
#function to impute mode (for codes such as product code, user id, etc)
def impute_mode(y, data):
    print('imputing missing data with mode ' + str(y)) 
    imputer = SimpleImputer(missing_values=np.nan, strategy='most_frequent')
    imputer = imputer.fit(data.iloc[:, y:y+1])
    data.iloc[:, y:y+1] = imputer.transform(data.iloc[:, y:y+1])
    return data

#label encoding of columns of type object
def lab_enc(x_train):
    y = 0
    num_list = []
    label = LabelEncoder()
    for(colName, colData) in x_train.iteritems():
        datatype = colData.dtype
        if(datatype == 'O'):
            if(len(set(colData)) < 11):
                x_train.iloc[:, y] = label.fit_transform(x_train.iloc[:, y].astype(str))
                print(colName)
                num_list.append(y)
            else:
                print(x_train[colName])
                x_train = x_train.drop([colName], axis = 1)
                y = y - 1 
        y = y + 1
    return x_train, num_list

#one hot encoding of the columns that were encoded
def ohe_encode(x_train, y):
    print(y)
    if(len(y) == 0):
        return x_train
    else:
        ct = ColumnTransformer([('one_hot_encoder', OneHotEncoder(categories='auto'), y)], remainder='passthrough')
        x_train = ct.fit_transform(x_train)
        print(x_train.dtype)
        return x_train

#feature selection if model is decision tree
def feature_select_dec_tree(x_train, y):
    model = DecisionTreeClassifier()
    criterion = ['gini', 'entropy']
    max_depth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, None]
    splitter = ['best', 'random']
    grid = GridSearchCV(estimator = model, cv = 3, param_grid = dict(criterion = criterion, max_depth = max_depth, splitter = splitter))
    grid.fit(x_train, y)
    print(grid.best_score_)
    print(grid.best_params_)
    print(grid.best_estimator_.feature_importances_)
 
#feature selection if model is linear regression
def feature_select_lin_regr(x_train, y):
    model = LinearRegression()
    parameters = {'fit_intercept':[True,False], 'normalize':[True,False], 'copy_X':[True, False]}
    grid = GridSearchCV(model, parameters, cv=None)
    grid.fit(x_train, y)
    print(grid.best_score_)
    print(grid.best_params_)

#feature selection if model is logistic regression    
def feature_select_log_regr(x_train, y):
    model = LogisticRegression()
    penalty = ['l1', 'l2']
    C = np.logspace(0, 4, 10)
    hyperparameters = dict(C=C, penalty=penalty)
    grid = GridSearchCV(model, hyperparameters, cv=5, verbose=0)
    grid.fit(x_train, y)
    print(grid.best_estimator_.get_params()['C'])
    print(grid.best_estimator_.get_params()['penalty'])

data = input_dataset('train')
data_length = len(data.index)
data = drop_cols(data)

#x_train = data.iloc[:,[0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]]
#y = data.iloc[:,[3]] 
#num_list = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'CODE']

x_train = data.iloc[:,[2, 3, 4, 5, 6, 7, 8, 9, 10]]
y = data.iloc[:,[1]]
num_list = ['CODE', 'A', 'CODE', 'CODE', 'A']

diff_num_types(x_train)

x_train = imputation(x_train, num_list)

x_train, numlist = lab_enc(x_train)

x_train = ohe_encode(x_train, numlist)

feature_select_lin_regr(x_train, y)

feature_select_log_regr(x_train, y)

feature_select_dec_tree(x_train, y)
