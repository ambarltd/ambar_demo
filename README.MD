# Ambar Demo

This repository contains a demo of [Ambar](https://ambar.cloud), a data streaming service for mission-critical 
applications that takes only 15 minutes to set up. Fork the repository, deploy it, and within 15 minutes you 
will see what you can build using Ambar.

**Requirements**

- A GitHub Account
- A Web Browser
- A Secret String (email demo@ambar.cloud if you don't have one)
- A Code Editor (optional)

**Not Required**
- Infrastructure (Ambar provides it)


**Table of Contents**

1. [Introduction](#1-introduction)
2. [What Will You Do In This Demo?](#2-what-will-you-do-in-this-demo)
3. [Deploy A Credit Card Application](#3-deploy-a-credit-card-application)
4. [Visit the Front-End](#4-visit-the-front-end)
5. [Deploy A Shipping Application](#5-deploy-a-shipping-application)
6. [Conclusion](#6-conclusion)

## 1. Introduction

Data streaming is critical for businesses operating in real time, but correct data streaming is extremely
difficult to implement and maintain. Ambar changes that, as a fully managed data streaming service built for 
correctness, performance, and convenience. With just a few lines of Terraform, Ambar allows anyone 
to have world-class data streaming capabilities in minutes.

**How does Ambar work?**

With Ambar, your code doesn't interact with messaging infrastructure (e.g., produce to / consume from Kafka, 
RabbitMQ, SQS, etc). Instead, Ambar pulls records from databases and pushes records to HTTP endpoints.

To use Ambar, you provide three things:

- **Data Sources**: durable storage containing record streams, i.e., a database table.
- **Filters**: logical specifications that select subsets of records from data sources.
- **Data Destinations**: HTTP endpoints in your application that will process your record streams.

In other words, you produce to your database, and consume by exposing an HTTP endpoint.

## 2. What will you do in this demo?

In this demo, you will see how little effort it takes to deploy data streaming applications that are 
both correct and performant. Your first goal will be to deploy the demo's credit card application.
Your second and final goal will be to deploy the demo's shipping application.

To accomplish your goals, you will:
- Deploy the credit card application by forking this repository ([Section 3](#3-deploy-a-credit-card-application)).
- Visit your front-end to see credit card events being echoed in real time ([Section 4](#4-visit-the-front-end)).
- Deploy the shipping application with a little bit of Python and Terraform ([Section 5](#5-deploy-a-shipping-application)).

## 3. Deploy A Credit Card Application
To deploy your credit card application:

1. Fork this repository in GitHub, by clicking `Fork` in the top right corner. Navigate to your new repository, 
and continue reading these instructions there.
2. Add the secret `GH_ACTION_SECRET` to your repository's secrets with the secret string provided by Ambar's 
team. You can add the secret by clicking `Settings` in your repository's homepage (top of page). Next,
under `Secrets and Variables` click `Actions`. Add the secret as a `Repository Secret` called `GH_ACTION_SECRET`.
3. Click `Actions` in your repository's menu (top of the page). If GitHub Actions are enabled for your account, 
you should be able to see an empty list of `workflows`). If GitHub Actions are not enabled, please follow the 
prompts in this `Actions` page to enable GitHub Actions.
4. Add a new empty line to the bottom of this `README.md`, and commit the change into your repository's `main` branch.
5. Return to `Actions` in your repository's menu (top of page). A GitHub Action `workflow` will have just triggered 
which deploys your credit card application! Click the latest `workflow`. You should see a page with 
two `jobs`, `Backend and Frontend` and `Ambar`.
6. Wait for the `workflow` Status to change to `Success`. **IMPORTANT**: If the Status remains `Queued` instead of 
`In Progress` for longer than 3 minutes, you've run into a GitHub bug for new repositories. Cancel the `workflow`
in the top-right corner menu, and once canceled click `Re-run all jobs` (also in the top-right corner menu).

## 4. Visit the Front-End
Congratulations! You deployed a credit card application with streaming powered by Ambar. To see your front-end:

1. While in the `workflow` page (the same one as in [Section 3, Step 6](#3-deploy-a-credit-card-application)),
open the `Backend and Frontend` job. 
2. Open the step `Print Front-End Domain`.
3. Visit the site under `Print Front-End Domain`, where you will find your credit card application and an undeployed
shipping application.

## 5. Deploy a Shipping Application 
Next, you'll deploy a shipping application by asking Ambar to stream shipping events from a `data source` (PostgreSQL database)
to a `data destination` (Python http endpoint). 

1. Uncomment the Ambar resource definitions (delete all `/*` and `*/`)  in the file `terraform/ambar_shipping.tf`.
2. Uncomment the http endpoint definitions (delete all triple single quotes, `'''`) in the file  `backend/server/shipping.py`.
3. Commit your changes into the `main` branch of your repository.
4. Click `Actions` in your repository's menu (top of the page), and wait for the latest  `workflow` to complete. If
the status remains `Queued` instead of `In Progress`, for longer than 3 minutes, repeat the steps in 
[Section 3, Step 6](#3-deploy-a-credit-card-application) to restart the `workflow`.
5. Refresh the front-end domain in your browser, and visit the shipping application in the sidebar.

Congratulations! You deployed a shipping application with streaming powered by Ambar.

## 6. Conclusion
You've seen first hand how Ambar is able to radically simplify the development and deployment of data
streaming applications. You deployed two data streaming applications by using Ambar to connect `data sources`
(PostgreSQL databases) to `data destinations` (http endpoints written in Python). 

**In just minutes, you deployed applications that processed streams of events in real time, with zero errors**. All 
of this without a single line of code that wasn't business logic. To learn more about Ambar, 
visit [ambar.cloud](https://ambar.cloud/).








