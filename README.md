# devHive

## About
This application is built using MERN stack and microservices to be deployed in kubernetes cluster.
This is a Job Finding Application For software developers.


## env variables

#### to create a secret or env variable,

```
kubectl create secret generic NAME_OF_THE_SECRET_KEY --from-literal=KEY=VALUE_FOR_THE_KEY
```

#### api prefix

API_PREFIX = 'api prifix' eg:- /api/v1

#### jwt secret

JWT_SECRET_KEY = "your jwt secret"

#### twilio otp sending and verification

TWILIO_ACCOUNT_SID = 'your_twilio_sid'
TWILIO_AUTH_TOKEN = 'your_twilio_auth_token'
TWILIO_SERVICE_SID = 'your_twilio_service_sid'

#### mongo atlas utls(Not necessary)

MONGO_URL_AUTH = "authentication db url"
MONGO_URL_ADMIN = "admin db url"
MONGO_URL_PROFILE = "profile db url"


### steps to start

1. start minikube

```
minikube start
```

2.  to apply configuration to a resource to create deployment, services and pods

- go to root folder

- for ingress deployments

```
kubectl apply -f ./k8s/ingress
```
- for stateful deployments

```
kubectl apply -f ./k8s/stateful
```
- for stateless deployments

```
kubectl apply -f ./k8s/stateless
```

- to see deployments 

```
kubectl get deployments
```
- to see services 

```
kubectl get services
```
- to see pods 

```
kubectl get pods
```    
- to see pods in another namespace( ingress is on another namespace )

```
kubectl get namespaces
```

```
kubectl get pods -n namespace_name
```    

- to delete all pods ( also can be used for deployments and services by changing 'pods' )

```
kubectl delete pods --all
```
