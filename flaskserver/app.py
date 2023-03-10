# import os
# import sys

# import pandas as pd

# from keras.models import Sequential
# from keras.layers import Dense, Dropout
# from tensorflow.keras.optimizers import SGD, Adam
# from keras.utils.np_utils import to_categorical
# Flask
import json
from flask import Flask, url_for, request, render_template,redirect,jsonify


# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

# from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model

from tensorflow.keras.utils import load_img,img_to_array
# Some utilites
import numpy as np
import sys
from PIL import Image
from flask_cors import CORS

import os

sys.modules['Image'] = Image 
# import Image
# from sklearn.metrics import classification_report, confusion_matrix


# Declare a flask app
app = Flask(__name__)
CORS(app)
# model=pickle.load(open('model.pkl','rb'))
print('Model loaded. Check http://127.0.0.1:5000/')


# Model saved with Keras model.save()
MODEL_PATH = 'model/model.h5'
model=load_model(MODEL_PATH)
        # Necessary
print('Model loaded. Start serving...')



@app.route('/predict',methods=['POST'])
def predict():
    image=request.files['file']
    # image = request.args.get('image')
    path="./images/"+image.filename
    image.save(path)
    img=load_img(path,target_size=(224,224))
    i=img_to_array(img)/255

    input_arr=np.array([i])
    input_arr.shape
    pred = np.argmax(model.predict(input_arr), axis=1)
    os.remove(path)
    if pred==0:
        return ["battery","Non-biodegradable"]
    elif pred==1:
        return ["biological","Biodegradable"]
    elif pred==2:
        return ["brown-glass","Biodegradable"] 
    elif pred==3:
        return ["cardboard","Biodegradable"]
    elif pred==4:
        return ["clothes","Biodegradable"] 
    elif pred==5:
        return ["green-glass","Biodegradable"] 
    elif pred==6:
        return ["metal","Biodegradable"] 
    elif pred==7:
        return ["paper","Biodegradable"] 
    elif pred==8:
        return ["plastic","Non-biodegradable"] 
    elif pred==9:
        return ["shoes","Non-biodegradable"] 
    elif pred==10:
        return ["trash","Non-biodegradable"]
    else:
        return ["white-glass","Biodegradable"] 


if __name__ == '__main__':
    app.run(host='0.0.0.0')