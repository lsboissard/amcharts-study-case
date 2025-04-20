export var MapModule = {
  init: function () {
    this.initMap();
  },
  initMap: function () {
    // Themes and core
    am4core.ready(function () {
      am4core.useTheme(am4themes_animated);

      // Create map instance
      var chart = am4core.create("chartdiv", am4maps.MapChart);
      chart.geodata = am4geodata_brazilLow;
      chart.projection = new am4maps.projections.Mercator();

      //static
      chart.panBehavior = "none";
      chart.maxZoomLevel = 1;
      // chart.chartContainer.wheelable = false;
      // chart.seriesContainer.draggable = false;
      // chart.seriesContainer.resizable = false;

      //fonts
      am4core.options.autoSetClassName = true;
      chart.fontFamily = "Poppins";
      chart.tooltipContainer.fontFamily = "Poppins";
      chart.tooltipContainer.fontSize = 12;

      //disable logo
      chart.logo.disabled = true;

      // Create polygon series (map)
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;

      // Labels com siglas dos estados
      var labelSeries = chart.series.push(new am4maps.MapImageSeries());

      var labelTemplate = labelSeries.mapImages.template;
      labelTemplate.propertyFields.latitude = "latitude";
      labelTemplate.propertyFields.longitude = "longitude";

      var stateLabel = labelTemplate.createChild(am4core.Label);
      stateLabel.text = "{label}";
      stateLabel.fill = am4core.color("#ffffff");
      stateLabel.fontSize = 10;
      stateLabel.horizontalCenter = "middle";
      stateLabel.verticalCenter = "middle";
      stateLabel.nonScaling = true;
      stateLabel.fontWeight = "600"; // opcional para deixar em negrito
      stateLabel.fontFamily = "Poppins"; // para manter a fonte igual

      // Dados aproximados dos centros dos estados
      labelSeries.data = [
        { label: "AC", latitude: -9.02, longitude: -70.81 },
        { label: "AL", latitude: -9.72, longitude: -36.42 },
        { label: "AM", latitude: -4.07, longitude: -63.80 },
        { label: "AP", latitude: 1.41, longitude: -51.77 },
        { label: "BA", latitude: -12.56, longitude: -41.68 },
        { label: "CE", latitude: -5.20, longitude: -39.30 },
        { label: "DF", latitude: -15.83, longitude: -47.86 },
        { label: "ES", latitude: -19.51, longitude: -40.39 },
        { label: "GO", latitude: -15.98, longitude: -49.86 },
        { label: "MA", latitude: -5.42, longitude: -45.44 },
        { label: "MG", latitude: -18.40, longitude: -44.10 },
        { label: "MS", latitude: -20.51, longitude: -54.64 },
        { label: "MT", latitude: -13.02, longitude: -56.12 },
        { label: "PA", latitude: -4.89, longitude: -52.48 },
        { label: "PB", latitude: -7.12, longitude: -36.00 },
        { label: "PE", latitude: -8.38, longitude: -37.86 },
        { label: "PI", latitude: -8.08, longitude: -42.98 },
        { label: "PR", latitude: -24.59, longitude: -51.65 },
        { label: "RJ", latitude: -22.84, longitude: -43.15 },
        { label: "RN", latitude: -5.71, longitude: -36.59 },
        { label: "RO", latitude: -11.22, longitude: -62.80 },
        { label: "RR", latitude: 2.25, longitude: -61.47 },
        { label: "RS", latitude: -29.70, longitude: -53.50 },
        { label: "SC", latitude: -27.33, longitude: -49.90 },
        { label: "SE", latitude: -10.57, longitude: -37.35 },
        { label: "SP", latitude: -22.19, longitude: -48.78 },
        { label: "TO", latitude: -10.17, longitude: -48.29 }
      ];


      polygonSeries.mapPolygons.template.tooltipText = "{name}";
      polygonSeries.mapPolygons.template.fill = am4core.color("#003366");
      polygonSeries.mapPolygons.template.stroke = am4core.color("#ffffff");
      polygonSeries.mapPolygons.template.strokeWidth = 0.8;

      // Create image series for cities
      var imageSeries = chart.series.push(new am4maps.MapImageSeries());
      imageSeries.dataFields.value = "value";

      var imageTemplate = imageSeries.mapImages.template;
      imageTemplate.propertyFields.latitude = "latitude";
      imageTemplate.propertyFields.longitude = "longitude";

      var circleBig = imageTemplate.createChild(am4core.Circle);
      circleBig.radius = 20;
      circleBig.fill = am4core.color("#007bff");
      circleBig.fillOpacity = 0.3;
      circleBig.nonScaling = true;

      var circleMid = imageTemplate.createChild(am4core.Circle);
      circleMid.radius = 16;
      circleMid.fill = am4core.color("#007bff");
      circleMid.fillOpacity = 0.3;
      circleMid.nonScaling = true;

      var circle = imageTemplate.createChild(am4core.Circle);
      circle.radius = 12;
      circle.fill = am4core.color("#007bff");
      circle.strokeWidth = 0;
      circle.nonScaling = true;
      circle.tooltipText = "{title}";

      var label = imageTemplate.createChild(am4core.Label);
      label.text = "{value}";
      label.fill = am4core.color("#ffffff");
      label.fontSize = 12;
      label.horizontalCenter = "middle";
      label.verticalCenter = "middle";
      label.nonScaling = true;

      // Cidades brasileiras de exemplo
      var cidadesBrasil = [
        { title: "São Paulo", latitude: -23.5505, longitude: -46.6333, value: 1 },
        { title: "São Paulo a", latitude: -23.6505, longitude: -46.7333, value: 1 },
        { title: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729, value: 1 },
        { title: "Brasília", latitude: -15.7939, longitude: -47.8828, value: 1 },
        { title: "Salvador", latitude: -12.9714, longitude: -38.5014, value: 1 },
        { title: "Manaus", latitude: -3.1190, longitude: -60.0217, value: 1 },
        { title: "Curitiba", latitude: -25.4284, longitude: -49.2733, value: 1 }
      ];

      imageSeries.data = cidadesBrasil;
    });
  },
  bindEvents: function () {
    //
  }
};
