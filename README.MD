# Ambar Demo

This repository contains a demo of [Ambar](https://ambar.cloud), a data streaming service for mission-critical 
applications that takes only 15 minutes to set up. Fork the repository, deploy it, and within 15 minutes you 
will see what you can build using Ambar.

**Requirements**

```
- A GitHub Account
- A Web Browser
- A Secret String (from the Ambar team)
- A Code Editor (optional)

Not required
- Infrastructure (Ambar provides it)
```

**Table of Contents**

1. [Introduction](#1-introduction)
2. [What Will You Do In This Demo?](#2-what-will-you-do-in-this-demo)
3. [Deploy Two Data Streaming Applications](#3-deploy-two-data-streaming-applications)
4. [Visit the Front-End](#4-visit-the-front-end)
5. [Create New Features](#5-create-new-features)
6. [Conclusion](#6-conclusion)

## 1. Introduction

Data streaming is critical for businesses operating in real time. However, data streaming has always been challenging 
and costly to implement and maintain. Ambar changes that, as a fully managed data streaming service designed for 
correctness, performance, and convenience. With just a few lines of code and configuration, Ambar allows anyone 
to have world-class data streaming capabilities in minutes.

**How does Ambar work?**

With Ambar, your code doesn't interact with messaging infrastructure (e.g., produce to / consume from Kafka, 
RabbitMQ, SQS, etc). Instead, Ambar pulls records from databases and pushes records to HTTP endpoints.

To use Ambar, you provide three things:

- **Data Sources**: durable storage containing record streams, i.e., a database table.
- **Filters**: logical specifications that select subsets of records from data sources.
- **Data Destinations**: HTTP endpoints in your application that will process your record streams.

## 2. What will you do in this demo?

In this demo, you will see how little effort it takes to deploy data streaming applications that are 
both correct and performant. Your first goal will be to deploy the demo's two data streaming applications. 
We've preloaded your first deployment with a database (a **data source**) and an HTTP server 
(a **data destination**) connected with Ambar. Your second and final goal will be to update the code to
release two new features.

To accomplish your goals, you will:
- Deploy two data streaming applications by forking this repository ([Section 3](#3-deploy-two-data-streaming-applications)).
- Visit your front-end to see data streams being echoed in real time ([Section 4](#4-visit-the-front-end)).
- Create new features in your applications ([Section 5](#5-create-new-features)).

## 3. Deploy Two Data Streaming Applications
To deploy your first two data streaming applications (a credit card application, and a shipping application): 

1. Fork this repository in GitHub, by clicking `Fork` in the top right corner. Navigate to your new repository, 
and continue reading these instructions there.
2. Add the secret `GH_ACTION_SECRET` to your repository's secrets with the contents provided by Ambar's 
team. You can add the secret by clicking `Settings` in your repository's homepage (top of page). Next,
under `Secrets and Variables` click `Actions`. Add the secret as a `Repository Secret` called `GH_ACTION_SECRET`.
3. Click `Actions` in your repository's menu (top of the page). If GitHub Actions are enabled for your account, 
you should be able to see an empty list of `workflows`). If GitHub Actions are not enabled, please follow the 
prompts in this `Actions` page to enable GitHub Actions.
4. Add a new empty line to the bottom of this `README.md`, and commit the change into your repository's `main` branch.
5. Return to `Actions` in your repository's menu (top of page). A GitHub Action `workflow` will have just triggered 
which deploys your first two data streaming applications! Click the latest `workflow`. You should see a page with 
two `jobs`, `Backend and Frontend` and `Ambar`.
6. Wait for the `workflow` Status to change to `Success`. **IMPORTANT**: If the Status remains `Queued` instead of 
`In Progress` for longer than 3 minutes, you've run into a GitHub bug for new repositories. Cancel the `workflow`
in the top-right corner menu, and once canceled click `Re-run all jobs` (also in the top-right corner menu).

## 4. Visit the Front-End
To see your applications:
1. While in the `workflow` page (the same one as in [Section 3, Step 6](#3-deploy-two-data-streaming-applications)),
open the `Backend and Frontend` job. 
2. Open the step `Print Front-End Domain`.
3. Visit the site under `Print Front-End Domain` in your browser to see real time updates happening in
both the credit card and shipping applications.

Congratulations! You deployed two data streaming applications with Ambar.

## 5. Create New Features
Next, you'll deploy two new features, one for each application. 

The first feature will process the credit card event stream and flag transactions which are potentially 
fraudulent.  To deploy this feature, perform the following steps:
1. Uncomment the Ambar resource definitions (delete all `/*` and `*/`) in the file `terraform/ambar_credit_card.tf`.
2. Uncomment the http endpoint definitions (delete all triple single quotes, `'''`) in the file `backend/server/credit_card.py`.
3. Commit your changes into the `main` branch of your repository.
4. Click `Actions` in your repository's menu (top of the page), and wait for the latest  `workflow` to complete. If
the status remains `Queued` instead of `In Progress`, for longer than 3 minutes, repeat the steps in 
[Section 3, Step 6](#3-deploy-two-data-streaming-applications) to restart the `workflow`.
5. Refresh the front-end domain in your browser, and revisit the credit card application to see the
new `Credit Card - Fraud Case Manager` you just built!

The second feature will process the shipping event stream and select returned shipments and the reason for 
return.To deploy this feature, perform the following steps:
1. Uncomment the Ambar resource definitions (delete all `/*` and `*/`)  in the file `terraform/ambar_shipping.tf`.
2. Uncomment the http endpoint definitions (delete all triple single quotes, `'''`) in the file  `backend/server/shipping.py`.
3. Commit your changes into the `main` branch of your repository.
4. Click `Actions` in your repository's menu (top of the page), and wait for the latest  `workflow` to complete. If
the status remains `Queued` instead of `In Progress`, for longer than 3 minutes, repeat the steps in 
[Section 3, Step 6](#3-deploy-two-data-streaming-applications) to restart the `workflow`.
5. Refresh the front-end domain in your browser, and revisit the shipping application to see the
new `Shipping - Returns Resolution Center` you just built!


## 6. Conclusion
You've seen first hand how Ambar is able to radically simplify the development and deployment of data
streaming applications. First, you deployed two data streaming applications by using Ambar to connect `data sources`
(preloaded PostgreSQL database) to `data destinations` (http endpoints written in Python). 
Second, you added features to your applications, by using Ambar to connect existing `data sources` to two new 
`data destinations`.

In **just minutes, you deployed applications that processed streams of events in real time, with zero errors**. All 
of this without a single line of code that wasn't business logic. This just scratches the surface of what Ambar 
is capable of.  If you're interested in learning more about how Ambar can help your business benefit from real time, 
error free data streaming, 
let the Ambar team know.







