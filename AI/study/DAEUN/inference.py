from torchvision import transforms
from torchvision.datasets import ImageFolder
import os
import torch
from PIL import Image
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torchvision import models
import io



def predict(img):
    USE_CUDA = torch.cuda.is_available()
    DEVICE = torch.device('cuda' if USE_CUDA else 'cpu')


    trr=transforms.Compose([transforms.Resize([64, 64]),transforms.RandomCrop(52), transforms.ToTensor(),transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),])

    img = Image.open(io.BytesIO(img))
    data = trr(img)
    data= data.unsqueeze(dim=0)



    PATH = "resnet50.pt"
    resnet = models.resnet50(pretrained=True)
    num_ftrs = resnet.fc.in_features
    resnet.fc = nn.Linear(num_ftrs, 33)
    resnet = resnet.to(DEVICE)

    resnet.load_state_dict(torch.load(PATH))
    resnet.eval()
    data= data.to(DEVICE)
    with torch.no_grad():

        output = resnet(data)
        pred = output.max(1, keepdim=True)[1]
        return img



"""
def evaluate(model, test_loader):
    model.eval()
    test_loss = 0
    correct = 0

    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(DEVICE), target.to(DEVICE)
            output = model(data)

            test_loss += F.cross_entropy(output, target, reduction='sum').item()

            pred = output.max(1, keepdim=True)[1]
            correct += pred.eq(target.view_as(pred)).sum().item()

    test_loss /= len(test_loader.dataset)
    test_accuracy = 100. * correct / len(test_loader.dataset)
    return test_loss, test_accuracy
"""