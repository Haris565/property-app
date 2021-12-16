export const pruneUnique = (features)=>{
    
    if(features !==undefined && features.length>0){
        var myHash = new Map();
        features.forEach(element => {
            var key = element.geometry.coordinates[0]+''+element.geometry.coordinates[1];
            myHash.set(key, element);
        });
        features.splice(0, features.length);
        myHash.forEach((element, key) =>{
            features.push(element);
        });
        myHash.clear();
        myHash = null;
    }
    
}

export const getBuildings = (myMap, reqZoom) => {
    var buildings = [];
    if (myMap !== undefined && myMap.getLayer('unclustered-point') !==undefined) {
        var currentZoom = myMap.getZoom();
        if(currentZoom>=reqZoom){
            if (typeof myMap.getLayer('add-2d-buildings') !== 'undefined') {
                var points = new Map();
                var elements = myMap.querySourceFeatures('my-buildings', {'sourceLayer' : 'unclustered-point'});
                points.clear();
                elements.forEach(element=>{
                    points.set(element.geometry.coordinates[0] + '' +element.geometry.coordinates[1], element);
                });
                points.forEach((value, key)=>{
                    if(value.properties['point_count'] == undefined || value.properties['point_count'] == null)
                    {
                        var buildingNearest = null;
                        var minDistBuilding=1e50;
                        var dotPx = value.geometry.coordinates[0];
                        var dotPy = value.geometry.coordinates[1];
                        var boxLength = 1000, i = 0;
                        var featureColor = value.properties['feature_color'];
                        if(featureColor === undefined) console.log(value.geometry.coordinates);
                        var _buildings = myMap.queryRenderedFeatures([[dotPx-boxLength, dotPy-boxLength], [dotPx+boxLength, dotPy+boxLength]], { layers: ['add-2d-buildings'] }); 
                        var myHashBuilding = new Map();
                        if(value.properties['buildingCorresponding'] != undefined && value.properties['buildingCorresponding'] != null){
                            minDistBuilding = value.properties['buildingCorrespondingDistance'];
                            myHashBuilding.set(minDistBuilding, JSON.parse(value.properties['buildingCorresponding']));
                        }
                        _buildings.forEach(element => {
                            var minDistCorner=1e50;
                            element.geometry.coordinates[0].forEach(coord =>{
                                var distanceCorner = distance(dotPy, dotPx, coord[1], coord[0]);
                                if(minDistCorner>distanceCorner) minDistCorner = distanceCorner;
                            });
                            if(minDistCorner < minDistBuilding){
                                myHashBuilding.set(minDistCorner, element);
                                minDistBuilding = minDistCorner;
                            }
                        });

                        if(minDistBuilding<1000){
                            buildingNearest = myHashBuilding.get(minDistBuilding);
                            buildingNearest.properties['feature_color'] = featureColor?featureColor:'lightgrey';
                            buildingNearest.properties['feature_images'] = value.properties['feature_images'];
                            buildingNearest.properties['feature_address'] = value.properties['feature_address'];
                            buildingNearest.properties['feature_description'] = value.properties['feature_description'];
                            buildings.push(buildingNearest);
                            // console.log(minDistBuilding);
                        }
                        if(minDistBuilding < value.properties['buildingCorrespondingDistance']){
                            const data = new URLSearchParams();
                            data.append("distance", minDistBuilding);
                            data.append("property_id", value.properties['property_id']);
                            data.append("bbox", JSON.stringify(buildingNearest));

                            fetch('https://www.homiee.a2hosted.com/api/v1/index.php/property/addbbox', {
                                method: 'post',
                                body: data,
                            });
                        }
                        myHashBuilding.clear();
                        myHashBuilding = null;
                    }
                });
                points.clear();
                points = null;
            }
        }
      }
      return buildings;
}

function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  export const clone = (obj) => {
        if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
            return obj;

        if (obj instanceof Date)
            var temp = new obj.constructor(); //or new Date(obj);
        else
            var temp = obj.constructor();

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj['isActiveClone'] = null;
                temp[key] = clone(obj[key]);
                delete obj['isActiveClone'];
            }
        }
        return temp;
    }
    export const numFormatter = (num) => {
        if(num > 999 && num < 1000000){
            return (num/1000).toFixed(0) + 'K'; // convert to K for number from > 1000 < 1 million 
        }else if(num > 1000000){
            return (num/1000000).toFixed(0) + 'M'; // convert to M for number from > 1 million 
        }else if(num < 900){
            return num; // if value < 1000, nothing to do
        }
    };

    export const buildingColoredZoomLevel = 16;