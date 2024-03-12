# Ambar Demo

This repository contains a demo of [Ambar](https://ambar.cloud). Fork the repository, deploy it, and within 
15 minutes you will see what can be built using Ambar.


```
Requirements 
- A GitHub Account
- A Web Browser
- A Code Editor (optional)

Not required
- Infrastructure (Ambar provides it)
```

## Table of Contents

1. [Introduction](#1-introduction)
2. [What will you do in this demo?](#2-what-will-you-do-in-this-demo)
3. [Deploy Two Stream Processing Applications](#3-deploy-two-stream-processing-applications)
4. [Visit the Front-End](#4-visit-the-front-end)
5. [Create New Features](#5-create-new-features)
6. [Nuts and Bolts](#6-nuts-and-bolts)

## 1. Introduction

Data streaming is critical for businesses operating in real time.
Historically, data streaming has been challenging and costly to implement 
and maintain. Ambar is a fully managed data streaming service designed 
for correctness, performance, and convenience that changes that. With a handful 
of lines of Terraform configuration, Ambar allows anyone 
to have world-class data streaming capabilities in minutes.

## 2. What will you do in this demo?

In this demo, you will see how little effort it takes to deploy 
stream processing applications that are both correct and performant.

You will:
- Deploy two stream processing applications by forking this repository ([Section 3](#3-deploy-two-stream-processing-applications)).
- Visit your front-end to see data streams being echoed in real time ([Section 4](#4-visit-the-front-end)).
- Create new features in your applications ([Section 5](#5-create-new-features)).

## 3. Deploy Two Stream Processing Applications
To deploy your first stream processing applications (a credit card application, and a shipping application): 

1. Fork this repository in GitHub, by clicking `Fork` in the top right corner. Navigate to your new repository, 
and continue reading these instructions there.
2. Add the secret `GH_ACTION_SECRET` to your repository's secrets with the contents provided by Ambar's 
team. You can add the secret by clicking `Settings`, and then under `Secrets and Variables` click `Actions`.
Add the secret as a `Repository Secret` called `GH_ACTION_SECRET`.
3. Click `Actions` in your repository's menu (top of the page). Make sure GitHub Actions are enabled in your account
(if they are, you should be able to see an empty list of `workflows`).
4. Add a new empty line to the bottom of this `README.md`, and commit the change into your `main` branch. A GitHub action
will trigger which deploys your first stream processing applications!


## 4. Visit the Front-End
To see your applications:
1. Click `Actions` in your repository's menu (top of the page), and open the latest  `workflow`.
2. Once inside the `workflow`, wait for both jobs (`Backend and Frontend` and `Ambar`) to finish.
3. Once both jobs finish, open the `Backend and Frontend` job. Open the step `Print Front-End Domain`.
4. Visit the site under `Print Front-End Domain` in your browser to see real time updates happening in
both the credit card and shipping applications.

## 5. Create New Features
Next, you'll deploy two new features, one for each application. 

The first feature will process the credit card event stream and flag transactions which are potentially 
fraudulent.  To deploy this feature, perform the following steps:
1. Uncomment the Ambar resource definitions (delete all `/*` and `*/`) in the file `terraform/ambar_credit_card.tf`.
2. Uncomment the http endpoint definitions (delete all triple single quotes, `'''`) in the file `backend/server/credit_card.py`.
3. Commit your changes into the `main` branch of your repository.
4. Click `Actions` in your repository's menu (top of the page), and wait for the latest  `workflow` to complete. If
the status remains `Queued`, as opposed to `In Progress`, you've run into a GitHub bug. Cancel the workflow in the 
top right corner, and once canceled, click `Re-run all jobs`.
5. Refresh the front-end domain in your browser, and revisit the credit card application to see the
new `Credit Card - Fraud Case Manager` you just built!

The second feature will process the shipping event stream and select returned shipments and the reason for 
return.To deploy this feature, perform the following steps:
1. Uncomment the Ambar resource definitions (delete all `/*` and `*/`)  in the file `terraform/ambar_shipping.tf`.
2. Uncomment the http endpoint definitions (delete all triple single quotes, `'''`) in the file  `backend/server/shipping.py`.
3. Commit your changes into the `main` branch of your repository.
4. Click `Actions` in your repository's menu (top of the page), and wait for the latest  `workflow` to complete. 
5. Refresh the front-end domain in your browser, and revisit the credit card application to see the
new `Shipping - Returns Resolution Center` you just built!


## 6. Nuts and Bolts
You've seen first hand how Ambar is able to radically simplify the development and deployment of stream
processing applications.  This repository came preconfigured with some Ambar `data sources`, `filters`, and 
`data destinations`.  The data sources were connected to a pre-configured PostgreSQL database
containing tables with credit card and shipping events.  Like in a production application, these tables 
were being continuously written to.

When you deployed new features, you defined their inputs by creating new `filters` and new `data destinations`. In
just minutes, you were able to deploy new applications that processed streams of events in real time, 
with zero errors.  All of this without a single line of code that wasn't business logic. This just scratches 
the surface of what Ambar is capable of.  If you're interested in learning more about how Ambar can help your
business benefit from real time, error free data streaming, let the Ambar team know.







