import os
import shutil

original_dataset_dir = './dataset'
classes_list = os.listdir(original_dataset_dir)

base_dir = './splitted'
# os.mkdir(base_dir)

train_dir = os.path.join(base_dir, 'train')
# os.mkdir(train_dir)
validation_dir = os.path.join(base_dir, 'val')
# os.mkdir(validation_dir)
test_dir = os.path.join(base_dir, 'test')
# os.mkdir(test_dir)
#
# for clss in classes_list:
#     os.mkdir(os.path.join(train_dir, clss))
#     os.mkdir(os.path.join(validation_dir, clss))
#     os.mkdir(os.path.join(test_dir, clss))
#

# 데이터 분할과 클래스별 데이터 수 확인
import math

for clss in classes_list:
    path = os.path.join(original_dataset_dir, clss)
    fnames = os.listdir(path)

    train_size = math.floor(len(fnames) * 0.6)
    validation_size = math.floor(len(fnames) * 0.2)
    test_size = math.floor(len(fnames) * 0.2)

    train_fnames = fnames[:train_size]
    print('Train size(', clss, '): ', len(train_fnames))
    for fname in train_fnames:
        src = os.path.join(path, fname)
        dst = os.path.join(os.path.join(train_dir, clss), fname)
        shutil.copyfile(src, dst)

    validation_fnames = fnames[train_size:(validation_size + train_size)]
    print('Validation size(', clss, '): ', len(validation_fnames))
    for fname in validation_fnames:
        src = os.path.join(path, fname)
        dst = os.path.join(os.path.join(validation_dir, clss), fname)
        shutil.copyfile(src, dst)

    test_fnames = fnames[(train_size + validation_size):
                         (validation_size + train_size + test_size)]
    print('Test size(', clss, '): ', len(test_fnames))
    for fname in test_fnames:
        src = os.path.join(path, fname)
        dst = os.path.join(os.path.join(test_dir, clss), fname)
        shutil.copyfile(src, dst)