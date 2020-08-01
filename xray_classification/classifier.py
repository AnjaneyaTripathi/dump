from keras.preprocessing.image import ImageDataGenerator
from keras.models import Sequential
from keras.layers import Conv2D
from keras.layers import MaxPooling2D
from keras.layers import Dense
from keras.layers import Flatten
from keras.layers import Dropout

train_path = './chest_xray/train'
test_path = './chest_xray/test'
validation_path = './chest_xray/val'

classifier = Sequential()
classifier.add(Conv2D(32, (3, 3), activation = 'relu', input_shape = (64, 64, 1), padding = 'same'))
classifier.add(Conv2D(64, (3, 3), activation="relu"))
classifier.add(MaxPooling2D(pool_size = (2, 2))) 
classifier.add(Flatten())
classifier.add(Dropout(0.2))
classifier.add(Dense(128, activation = 'relu'))
classifier.add(Dense(units = 1, activation = 'sigmoid'))
classifier.compile(optimizer = 'adam' ,loss = 'binary_crossentropy', metrics = ['accuracy'])
classifier.summary()

train_datagen = ImageDataGenerator(
        rescale = 1./255,
        shear_range = 0.2,
        zoom_range = 0.2,
        horizontal_flip = True)

test_datagen = ImageDataGenerator(rescale = 1./255)

train_generator = train_datagen.flow_from_directory(
        train_path,
        target_size = (64, 64),
        color_mode = 'grayscale',
        batch_size = 32,
        class_mode = 'binary')

validation_generator = train_datagen.flow_from_directory(
        validation_path,
        target_size = (64, 64),
        color_mode = 'grayscale',
        batch_size = 32,
        class_mode = 'binary')

test_generator = test_datagen.flow_from_directory(
        test_path,
        target_size = (64, 64),
        color_mode = 'grayscale',
        batch_size = 32,
        class_mode = 'binary')

classifier.fit_generator(
        train_generator,
        steps_per_epoch = 2000,
        epochs = 3,
        validation_data = validation_generator,
        validation_steps = 800)

classifier.evaluate_generator(test_generator)
