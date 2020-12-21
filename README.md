<div align="center">

# [partner-cert-dashboard](https://devportal.intuit.com/app/dp/resource/4326850934505453399)

Powering Prosperity 🌎

</div>

<div align="center">

[![Build Status]([🏗])](https://build.intuit.com/plugins/job/identity-connect/job/partner-cert-dashboard/job/partner-cert-dashboard)
[![codecov](https://codecov.tools.a.intuit.com/ghe/identity-connect/partner-cert-dashboard/branch/master/graph/badge.svg)](https://codecov.tools.a.intuit.com/ghe/identity-connect/partner-cert-dashboard)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=shield)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![slack](https://img.shields.io/badge/slack-join--the--discussion-3399ff.svg?logo=slack&style=flat)](https://intuit-teams.slack.com/messages/CBPKPRNHK)

</div>

## 👋 Welcome!

This is an AppFabric Web Plugin created for partner certificate management.

[owners](https://github.intuit.com/orgs/identity-connect/people?utf8=%E2%9C%93&query=+role%3Aowner).

[//]: # 'Usage'

## 📘 Usage

<b>Plugin Purpose:</b> Self-service tool for managing and monitoring partner certificates.<br/>
<b>Target User Audience:</b> People invloved in Direct Connectivity initiative<br/> 
<b>Top Features include:</b>
- Monitor certificate renewal status 
- Download public certificate for sharing with FI
- Search partner certificate using various filters.

![Dashboard](./docs/img/dashboard.png)

![Dashboard](./docs/img/search.png)
<br/>

[//]: # 'Local Development'

## 🚀 Getting Started with Local Development

1. To build this repo, you will need
   [Plugin-CLI](https://github.intuit.com/pages/UX-Infra/plugin-cli/#/INSTALLATION).
1. Clone this repo to your local machine via `git clone`.
1. In your terminal window, navigate into this repo using `cd`.
1. Run `yarn` to install dependencies to your repo.
1. Once you have Plugin-CLI installed, you can proceed to run
   [`yarn serve`](https://github.intuit.com/pages/UX-Infra/plugin-cli/#/README?id=plugin-cli-serve)
   to start a
   [local development server](https://github.intuit.com/pages/UX-Infra/UX-Infra-Docs/#/Appfabric/Web/plugin-dev/local_plugin_development?id=run-your-plugin-using-the-local-development-server).
   For local development within an AppFabric Shell, you can proceed to run `yarn serve --remote` and
   follow this
   [guide](https://github.intuit.com/pages/UX-Infra/UX-Infra-Docs/#/Appfabric/Web/plugin-dev/plugin-dev-new-web-shell?id=to-run-a-local-version-of-a-non-deployed-plugin).

### Next Steps

1. [Certificate management for FIs](https://wiki.intuit.com/display/Identity/Certificate+management+for+FIs+in+Prod)
2. [Learn Partner Certificate APIs](https://wiki.intuit.com/display/Identity/Certificate+Management+API)
3. [Understand certificate lifecycle stages](https://wiki.intuit.com/pages/viewpage.action?spaceKey=Identity&title=Certificate+Lifecycle+App)


## 💻 Technologies Used

- React
- Redux
- Graph QL
- Apollo
- ESLint
- Remark
- Webpack
- Jest
- Cypress
- Lighthouse

[Learn more](https://github.intuit.com/pages/UX-Infra/UX-Infra-Docs/#/Appfabric/Web/plugin-dev/tech-stack?id=technology-standards)
about all the technologies AppFabric Widgets use!

[Learn more](https://github.intuit.com/pages/UX-Infra/plugin-cli/#/TECHNOLOGIES) about the
Plugin-CLI's technologies!

[//]: # 'Contributing'

## 🤝 Contributing

Eager to contribute to partner-cert-dashboard? Check out our
[Contribution Guidelines](./CONTRIBUTING.md)!

Learn more about Intuit's contribution policies - [InnerSource](http://in/innersource).

## 🛠️ Builds, Environments, and Deployments

- [IBP Job](https://build.intuit.com/plugins/blue/organizations/jenkins/identity-connect%2Fpartner-cert-dashboard%2Fpartner-cert-dashboard/activity/?branch=master)
- [Plugin Deployment Configuration - DevPortal](https://devportal.intuit.com/app/dp/resource/4326850934505453399/addons/pluginConfiguration)

## 👀 Monitoring

### Logging

- _Pre-Production Logs_ are automatically configured to populate in
  [AppFabric Splunk](https://ip.e2e.scheduled.splunk.intuit.com/en-US/app/search/web_shell_log_monitoring)
- _Production Logs_ require the Plugin to be part of
  [Web App](https://github.intuit.com/pages/UX-Infra/UX-Infra-Docs/#/Appfabric/Web/app-dev/new-app).
  Please add your plugin to the desired
  [Web App Configuration](https://github.intuit.com/pages/UX-Infra/UX-Infra-Docs/#/Appfabric/Web/app-dev/web-app-configurations?id=plugins).

### Performance

- _Pre-Production Logs_ are automatically configured to populate in
  [AppFabric Splunk](https://ip.e2e.scheduled.splunk.intuit.com/en-US/app/search/web_shell_ui_performance_monitoring)
- _Production Logs_ require the Plugin to be part of
  [Web App](https://github.intuit.com/pages/UX-Infra/UX-Infra-Docs/#/Appfabric/Web/app-dev/new-app).
  Please add your plugin to the desired
  [Web App Configuration](https://github.intuit.com/pages/UX-Infra/UX-Infra-Docs/#/Appfabric/Web/app-dev/web-app-configurations?id=plugins).

Learn more about
[monitoring for AppFabric Web Apps](https://github.intuit.com/pages/UX-Infra/UX-Infra-Docs/#/Appfabric/Web/app-dev/app_monitoring?id=performance-monitoring).

[//]: # 'Support'

## 🆘 Support

For support check out [StackOverflow](https://stackoverflow.intuit.com/questions/tagged/3951) or ask us a question on [Slack](https://intuit-teams.slack.com/messages/CBPKPRNHK)

[ibp-build-status-icon-link]:
  https://build.intuit.com/plugins/job/identity-connect/job/partner-cert-dashboard/job/partner-cert-dashboard/job/master/badge/icon
[ibp-latest-build-job-link]:
  https://build.intuit.com/plugins/blue/organizations/jenkins/identity-connect%2Fpartner-cert-dashboard%2Fpartner-cert-dashboard/activity/?branch=master
[codecov-image]:
  https://codecov.tools.a.intuit.com/ghe/identity-connect/partner-cert-dashboard/branch/master/graph/badge.svg
[codecov-url]: https://codecov.tools.a.intuit.com/ghe/identity-connect/partner-cert-dashboard/
