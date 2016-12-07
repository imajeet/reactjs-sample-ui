# React Sample UI on Nuxeo Platform

# About the Nuxeo Platform

The [Nuxeo Platform](http://www.nuxeo.com/products/content-management-platform/) is an open source customizable and extensible content management platform for building business applications. It provides the foundation for developing [document management](http://www.nuxeo.com/solutions/document-management/), [digital asset management](http://www.nuxeo.com/solutions/digital-asset-management/), [case management application](http://www.nuxeo.com/solutions/case-management/) and [knowledge management](http://www.nuxeo.com/solutions/advanced-knowledge-base/). You can easily add features using ready-to-use addons or by extending the platform using its extension point system.

The Nuxeo Platform is developed and supported by Nuxeo, with contributions from the community.

## Requirements

Running the Nuxeo Platform requires Java 8.
Depending on the features you want to use, you may need some third-party software, such as Libre Office and pdftohtml for document preview or ImageMagick for pictures. The list of third-party software is available in our Admin documentation: [Installing and Setting Up Related Software](http://doc.nuxeo.com/x/zgJc).

Building the Nuxeo Platform requires the following tools:

* JDK 8 (Oracle's JDK or OpenJDK recommended)
* Apache Maven 3.1.1+ (3.2+ recommended)
* Apache Ant 1.7.1+
* Git
* NodeJS 6.9.1, npm

# QA

# Deploying

1. Get the source code:
```
git clone https://github.com/nuxeo-sandbox/reactjs-sample-ui

```
2. Build using Maven:
```
mvn clean install
```
3. Starting
```
Run ./nuxeoctl console on terminal from the bin folder of main build.
Go to http://localhost:8080
Log In with username: Administrator, password: Administrator
Set URL to http://localhost:8080/nuxeo/sampleUI
```

See our [Core Developer Guide](http://doc.nuxeo.com/x/B4BH) for instructions and guidelines.

# Resources

## Documentation

The documentation for the Nuxeo Platform is available in our [Documentation Center](http://doc.nuxeo.com):

* Developer documentation: [http://doc.nuxeo.com/x/PIAO](http://doc.nuxeo.com/x/PIAO)
* Admin documentation: [http://doc.nuxeo.com/x/G4AO](http://doc.nuxeo.com/x/G4AO)
* User documentation: [http://doc.nuxeo.com/x/6ICo](http://doc.nuxeo.com/x/6ICo)
* Core Developer Guide: [http://doc.nuxeo.com/x/B4BH](http://doc.nuxeo.com/x/B4BH)

# Licensing

Most of the source code in the Nuxeo Platform is copyright Nuxeo SA and
contributors, and licensed under the GNU Lesser General Public License v2.1.

See [/licenses](/licenses) and the documentation page [Licenses](http://doc.nuxeo.com/x/gIK7) for details.

# About Nuxeo

Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris. More information is available at [www.nuxeo.com](http://www.nuxeo.com).
