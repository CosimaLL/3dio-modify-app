# 3dio-modify-app
Use filters and modifiers on 3d models.

https://modify.3d.io

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To get going you should have Node.js (version 6 or later) and git installed.
You can grab those [from nodejs.org](https://nodejs.org/en/) and [git's docs](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

```
> node -v
7.8.0
> npm -v
4.2.0
> git version
git version 2.11.0 (Apple Git-81)
```

### Installing

To install the furniture app on your computer, run the following steps in a terminal:

```
git clone git@github.com:archilogic-com/3dio-modify-app.git
cd 3dio-modify-app
npm install
```

Once these steps have finished, in the same terminal you can run the development web server shipping with the project:

```
npm run dev
```

This will launch the application on [http://localhost:3000](http://localhost:3000).
Alternatively, you can run the application with any static HTTP server of your choice.

## Deployment

The repository is set up to be served via [Github Pages](https://pages.github.com/), the [settings are here](https://github.com/archilogic-com/3dio-modify-app/settings).

To be able to serve it via the [modify.3d.io](modify.3d.io) subdomain, we are using CloudFront as a CDN and our DNS to point the domain to the CloudFront distribution.

Here are a few noteworthy settings:

* CloudFront
  * Configure a new "Web" distribution
  * Enter the Github Page URL as the "Origin Domain Name" (i.e. `archilogic-com.github.io/3dio-modify-app`)
  * Select "Redirect HTTP to HTTPS"
  * You may want to override the cache timing with the "Object Caching" setting set to "Customize". TTLs are in seconds.
  * To help keeping the overview, enter the domain name (e.g. "modify.3d.io") as the comment
  * **Once the distribution is created**, click "Edit" in the "General" tab and enter the domain name (e.g. "modify.3d.io") into the "Alternate Domain Names" field.
  * **Once the distribution is created**, click "Edit" in the "Origins" tab and select "HTTPS only" as the Origin Protocol Policy
* Route53
  * Select the "3d.io" Zone
  * Use "Create Record Set" to add a new record of type "A" with the desired subdomain (e.g. enter "modify")
  * Select "Yes" for "Alias"
  * Paste the Cloudfront distribution __URL__ into the "Value" field

Pushing changes to the "master" branch will update the page. This process may take up to 15 minutes and longer, depending on the TTL settings in CloudFront.

## Built With

* [A-Frame](https://aframe.io)
* [3Dio.js](https://github.com/archilogic-com/3dio-js)
* [Prism.js](http://prismjs.com/)
* [aframe-orbit-controls](https://github.com/tizzle/aframe-orbit-controls-component)
* HTML, CSS & vanilla JavaScript :-)

## Contributing

All contributions are welcome. For typos, small bug fixes and small improvements, please feel free to submit a Pull Request.
If you are not sure if you have found a bug or have some larger scale changes in mind, please open an issue so duplication of work and misunderstandings can be avoided.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/archilogic-com/3dio-furniture-app/tags). 

## Authors

* **Madlaina Kalunder** - *Design, Code* - [aadjou](https://github.com/orgs/archilogic-com/people/aadjou)
* **Martin Splitt** - *Docs* - [avgp](https://github.com/avgp)
See also the list of [contributors](https://github.com/archilogic-com/3dio-modify-app/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [The A-Frame team](https://aframe.io/community/#a-frame-team) and community for building A-Frame and inspiring us to make 3D and VR on the web easier
* [Glitch](https://glitch.com/), [CodePen](https://codepen.io) and [JSFiddle](https://jsfiddle.net) for helping to make experimenting with the web fast & approachable
* [Lea Verou](https://github.com/LeaVerou) for Prism.js and the inspirational work on Mavo
