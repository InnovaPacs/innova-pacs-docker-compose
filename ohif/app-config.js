window.config = {
  routerBasename: '/viewer',
  extensions: [],
  modes: [],
  showStudyList: false,
  whiteLabeling: {
    createLogoComponentFn: function (React) {
      return React.createElement('img', {
        src: '/viewer/mediq.png',
      });
    },
  },
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'dcmjs DICOMWeb Server',
        name: 'DCM4CHEE',
        wadoUriRoot: 'http://154.38.162.74:8080/dcm4chee-arc/aets/DCM4CHEE/wado',
        qidoRoot: 'http://154.38.162.74:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'http://154.38.162.74:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        qidoSupportsIncludeField: true,
        supportsReject: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: true,
        omitQuotationForMultipartRequest: true,
      },
    },
  ],
  defaultDataSourceName: 'dicomweb',
};
