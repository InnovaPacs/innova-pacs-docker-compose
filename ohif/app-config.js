window.config = {
  routerBasename: null,
  extensions: [],
  modes: [],
  showStudyList: false,
  whiteLabeling: {
    createLogoComponentFn: function (React) {
      return React.createElement('img', {
        src: '/mediq.png',
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
        wadoUriRoot: 'https://bautistaj.dev/pacs/dcm4chee-arc/aets/DCM4CHEE/wado',
        qidoRoot: 'https://bautistaj.dev/pacs/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'https://bautistaj.dev/pacs/dcm4chee-arc/aets/DCM4CHEE/rs',
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
