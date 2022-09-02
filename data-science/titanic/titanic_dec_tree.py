import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import tree
import warnings

warnings.filterwarnings('ignore')

# for loading the dataset as well as model


def input_dataset(name):
    data = pd.read_csv(name + '.csv')
    return data

# drop a column if number of missing values is greater than 80%


def drop_cols(data, l):
    print('dropping columns if more than 80% are missing')
    data.dropna(axis=1, thresh=l*0.8, inplace=True)
    return data

# displays those columns that are of type float64


def diff_num_types(data):
    for(colName, colData) in data.iteritems():
        datatype = colData.dtype
        if(datatype == 'float64' or datatype == 'int64'):
            print(colName)

# performed only on columns with numeric values


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

# function to impute average (for absolute values)


def impute_avg(y, data):
    print('imputing missing data with average ' + str(y))
    imputer = SimpleImputer(missing_values=np.nan, strategy='mean')
    imputer = imputer.fit(data.iloc[:, y:y+1])
    data.iloc[:, y:y+1] = imputer.transform(data.iloc[:, y:y+1])
    return data

# function to impute mode (for codes such as product code, user id, etc)


def impute_mode(y, data):
    print('imputing missing data with mode ' + str(y))
    imputer = SimpleImputer(missing_values=np.nan, strategy='most_frequent')
    imputer = imputer.fit(data.iloc[:, y:y+1])
    data.iloc[:, y:y+1] = imputer.transform(data.iloc[:, y:y+1])
    return data

# label encoding of columns of type object


def lab_enc(x_train):
    y = 0
    num_list = []
    label = LabelEncoder()
    for(colName, colData) in x_train.iteritems():
        datatype = colData.dtype
        if(datatype == 'O'):
            if(len(set(colData)) < 11):
                x_train.iloc[:, y] = label.fit_transform(
                    x_train.iloc[:, y].astype(str))
                print(colName)
                num_list.append(y)
            else:
                print(x_train[colName])
                x_train = x_train.drop([colName], axis=1)
                y = y - 1
        y = y + 1
    return x_train, num_list

# one hot encoding of the columns that were encoded


def ohe_encode(x_train, y):
    print(y)
    if(len(y) == 0):
        return x_train
    else:
        ct = ColumnTransformer([('one_hot_encoder', OneHotEncoder(
            categories='auto'), y)], remainder='passthrough')
        x_train = ct.fit_transform(x_train)
        print(x_train.dtype)
        return x_train


x_train = input_dataset('train')
test = input_dataset('test')
data_length = len(x_train.index)
test_length = len(test.index)
data = drop_cols(x_train, data_length)
test = test.drop(columns=['Cabin'])

x_train = x_train.iloc[:, [2, 3, 4, 5, 6, 7, 8, 9, 10]]
y = data.iloc[:, [1]].values
x_test = test.iloc[:, [1, 2, 3, 4, 5, 6, 7, 8, 9]]
num_list_train = ['CODE', 'A', 'CODE', 'CODE', 'A']
num_list_test = ['CODE', 'A', 'CODE', 'CODE', 'A']

diff_num_types(x_train)
x_train = imputation(x_train, num_list_train)
x_train, numlist = lab_enc(x_train)


diff_num_types(x_test)
x_test = imputation(x_test, num_list_test)
x_test, numlist = lab_enc(x_test)

x_train = ohe_encode(x_train, numlist)
x_test = ohe_encode(x_test, numlist)

'''x_train = np.delete(x_train, 0, 1)
x_train = np.delete(x_train, 5, 1)
x_test = np.delete(x_test, 0, 1)'''

x_test = np.insert(x_test, 5, 0, axis=1)

#sc = StandardScaler()
#x_train = sc.fit_transform(x_train)

#sc = StandardScaler()
#test = sc.fit_transform(test)

dt = tree.DecisionTreeClassifier()
dt.fit(x_train, y)

y_pred = dt.predict(x_test)

passengerId = test['PassengerId']
result = {'PassengerId': passengerId, 'Survived': y_pred}
R = pd.DataFrame(result)

R.to_csv(r'/Users/anjaneyatripathi/desktop/titanic/result_dt.csv', index=False)

