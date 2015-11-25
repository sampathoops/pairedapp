(function(){
angular.module('starter.controllers').controller('WbTagStep3Ctrl',WbTagStep3Ctrl);

  WbTagStep3Ctrl.$inject = ['$cordovaDevice','WardrobeMainData','$state','$scope','$timeout', '$q'];

  function WbTagStep3Ctrl($cordovaDevice,WardrobeMainData,$state,$scope,$timeout, $q){
  try{
          $scope.selectedCat = '';
          $scope.selectedCatCallabeName = '';
          $scope.selectedCatId = '';
          $scope.wardrobeFabricImgs = new Array();
          $scope.wardrobeProducts = new Array();
          $scope.categoryDefaults = JSON.parse('{"Formal Shirts":{"sleeve_style_id":"1","collar_style_id":"0","cultural_style_id":"0"},"Formal Trousers":{"sleeve_style_id":"0","collar_style_id":"0","cultural_style_id":"0"},"Casual Tops":{"sleeve_style_id":"11","collar_style_id":"0","cultural_style_id":"0"},"Leggins":{"sleeve_style_id":"0","collar_style_id":"0","cultural_style_id":"0"}}');

          if(sessionStorage.getItem('selectedCat')!=null
              && sessionStorage.getItem('selectedCat')!=''){
                $scope.selectedCat = sessionStorage.getItem('selectedCat');
                $scope.selectedCatCallabeName = sessionStorage.getItem('selectedCatCallabeName');
                $scope.selectedCatId = sessionStorage.getItem('selectedCatId');
                //alert($scope.selectedCatId);
          }

          $scope.jsBuffer = {
            Image: undefined
          };

          $scope.formControls =
          {
            captureEnabled : true,
            liveRefreshEnabled : true
          };

          $scope.cameraPlus = null;




          $scope.switchCapture = function (enabled)
          {
            if (enabled)
            {
              $scope.startCapture("");
            }
            else
            {
              $scope.stopCapture();
            }
          };

          $scope.startCapture = function() {
            //alert('startCapture')
            if ( $scope.cameraPlus ) {
              // call this API to stop web server
              $scope.cameraPlus.startCamera(function(){
                //alert('Capture Started');

                // already call once to fill the buffer since it's always delayed of 1 frame...
                $scope.refreshPreview();
              },function( error ){
                alert('CameraServer StartCapture failed: ' + error);
              });
            } else {
              alert('CameraServer StartCapture: CameraPlus plugin not available/ready.');
            }
          };

          $scope.stopCapture = function() {

            if ( $scope.cameraPlus ) {
              // call this API to stop web server
              $scope.cameraPlus.stopCamera(function(){
                console.log('Capture Stopped');
              },function( error ){
                console.log('CameraServer StopCapture failed: ' + error);
              });
            } else {
              console.log('CameraServer StopCapture: CameraPlus plugin not available/ready.');
            }
          };

          $scope.switchLiveRefresh = function (enabled)
          {
            if (enabled)
            {
              $scope.asyncGetImage().then();
            }
            else
            {
              // stops automatically when !$scope.formControls.liveRefreshEnabled
            }
          };

          $scope.getImage = function() {
            $scope.asyncGetImage().then(function()
            {
              if (!$scope.$$phase) {
                $scope.$apply();
              }
            });
          };

          $scope.refreshPreview = function () {
            //alert("refreshPreview");
            //alert('$scope.formControls.liveRefreshEnabled:'+$scope.formControls.liveRefreshEnabled);

            if ($scope.formControls.liveRefreshEnabled) {
              setTimeout(function () {
                $scope.$apply(function () {
                  $scope.asyncGetImage().then();
                });
              }, 40);
            }
          };

          $(document).on('tagWardrobeProduct',function(){
             var xmlhttp = new XMLHttpRequest();
             xmlhttp.open("POST", "http://198.91.88.86/home/postImage/wardrobe", true);
             xmlhttp.setRequestHeader("Content-Type", "application/upload");
             var c = document.getElementById('patternCanvas');

             xmlhttp.send(document.getElementById('tagPreviewImg').src);

             xmlhttp.onreadystatechange=function()
             {
             if (xmlhttp.readyState==4 && xmlhttp.status==200)
             {
                //alert('got response');

                var imgUrl = xmlhttp.responseText;
                hideLoader();
                //alert(imgUrl);
                $scope.renderWardrobeProduct(imgUrl);
             }
           }
          });

          $scope.renderWardrobeProduct = function(imgUrl){
              try{
              $scope.wardrobeFabricImgs.push(imgUrl);
              $('#wardrobeCanvasContainerUl').css('display','inline');
              var imgDiv=document.createElement("div");
              imgDiv.setAttribute('src', imgUrl);
              imgDiv.setAttribute('style', 'padding-top:25px;padding-left:5px;display:inline-block;');

              var img=document.createElement("img");
              img.setAttribute('src', imgUrl);
              img.setAttribute('style', 'margin-top:-150px;');
              imgDiv.appendChild(img);
              img.setAttribute('style', 'display:none;');
              img.onload = function(){
                  var wp = new Object();
                  wp.sleeveStyleId = $scope.categoryDefaults[window.selectedCategory]['sleeve_style_id'];
                  wp.collarStyleId = $scope.categoryDefaults[window.selectedCategory]['collar_style_id'];
                  wp.culturalStyleId = $scope.categoryDefaults[window.selectedCategory]['cultural_style_id'];
                  wp.capturedImgUrl = imgUrl.trim();
                  wp.brand = 'NULL';
                  wp.price = '0.00';
                  wp.notes = 'NULL';
                  wp.categoryId = window.selectedCategoryId;
                  wp.accountId = window.localStorage.getItem('account_id');

                  var colorThief = new ColorThief();
                  var orig = 'rgba('+colorThief.getColor(img)+', 1)';
                  var cols = colorThief.getPalette(img,6);
                  var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
                  var color = (rgb && rgb.length === 4) ? "#" +
                    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
                    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
                    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;

                  wp.dominantColor = '';
                  wp.secondaryColor1 = '';
                  wp.secondaryColor2 = '';
                  wp.secondaryColor3 = '';
                  wp.secondaryColor4 = '';
                  wp.secondaryColor5 = '';

                  var cnt = 0;
                  $.each(cols,function(k,v){
                      var orig = 'rgba('+v[0]+','+v[1]+','+v[2]+',1)';
                      var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
                      var color = (rgb && rgb.length === 4) ? "#" +
                        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
                        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
                        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
                      if(cnt==0)
                          wp.dominantColor = color.replace(/\#/,'');
                      else if(cnt==1)
                          wp.secondaryColor1 = color.replace(/\#/,'');
                      else if(cnt==2)
                          wp.secondaryColor2 = color.replace(/\#/,'');
                      else if(cnt==3)
                          wp.secondaryColor3 = color.replace(/\#/,'');
                      else if(cnt==4)
                          wp.secondaryColor4 = color.replace(/\#/,'');
                      else if(cnt==5)
                          wp.secondaryColor5 = color.replace(/\#/,'');
                      cnt++;
                  });

                  wp.capturedImgUrl = wp.capturedImgUrl.substring('http://198.91.88.86/'.length,wp.capturedImgUrl.length);

                  //alert('http://198.91.88.86/home/rest/signup/createWardrobeProduct/'+wp.accountId+'/'+wp.categoryId+'/'+wp.sleeveStyleId+'/'+wp.brand+'/'+wp.price+'/'+wp.notes+'/'+wp.collarStyleId+'/'+wp.culturalStyleId+'/'+wp.dominantColor+'/'+wp.secondaryColor1+'/'+wp.secondaryColor2+'/'+wp.secondaryColor3+'/'+wp.secondaryColor4+'/'+wp.secondaryColor5+'/'+wp.capturedImgUrl+'/');

                  $http.get('http://198.91.88.86/home/rest/signup/createWardrobeProduct/'+wp.accountId+'/'+wp.categoryId+'/'+wp.sleeveStyleId+'/'+wp.brand+'/'+wp.price+'/'+wp.notes+'/'+wp.collarStyleId+'/'+wp.culturalStyleId+'/'+wp.dominantColor+'/'+wp.secondaryColor1+'/'+wp.secondaryColor2+'/'+wp.secondaryColor3+'/'+wp.secondaryColor4+'/'+wp.secondaryColor5+'/'+wp.capturedImgUrl+'/').
                                         success(function(data, status, headers, config) {
                                              cb(data);
                                         }).
                                         error(function(data, status, headers, config) {
                                              alert(data);
                                           // log error
                                         });
                  $scope.wardrobeProducts.push(wp);

                  }


                  }catch(e){
                      alert(e.stack);
                  }

          };

          $scope.asyncGetImage = function() {
            return $q(function(resolve, reject) {

              $scope.cameraPlus.getJpegImage(function(jpgData)
              {
                if ($scope.jsBuffer.Image != jpgData)
                {
                  $scope.jsBuffer.Image = jpgData;
                  $scope.refreshPreview();

                   /*document.getElementById('tagPreviewImg').onload = function(e) {

                           var crow = document.getElementById("tagPreviewContainerRow");

                           var topBorder = 'border-top:0px solid #CACACA;';
                           crow.setAttribute('style','min-height:280px;padding-left:36px;padding-top:0px;padding-bottom:90px;'+topBorder);
                       //}

                       var ccol = document.getElementById("tagPreviewContainerCol");
                       ccol.style.width = '100px';
                       ccol.style.width = '120px';

                       var c,mqImg;

                       if(document.getElementById('tagPreviewCanvas') == null){
                            c = document.createElement("canvas");
                            c.setAttribute('id','tagPreviewCanvas');
                            c.style.position = "absolute";
                            c.style.display = "inline";
                            c.height = 300;
                            c.width = 220;
                            //c.style.paddingTop =  window.wbItemTop+'px';
                            c.style.paddingLeft =  '-14px';
                            c.style.paddingTop =  '-6px';

                            ccol.appendChild(c);

                       } else {
                            c = document.getElementById('tagPreviewCanvas');
                       }

                       //c.style.marginBottom = '100px';
                       var ctx = c.getContext('2d');
                       ctx.clearRect(0, 0, c.width, c.height);

                       //creating hidden pattern canvas to retain same image size in rendered canvas
                        //creating hidden pattern canvas to retain same image size in rendered canvas
                         var patternCanvas;

                         if(document.getElementById('patternCanvas') == null)
                            patternCanvas = document.createElement("canvas");
                         else
                            patternCanvas = document.getElementById('patternCanvas');
                         patternCanvas.style.position = "absolute";
                         patternCanvas.style.display = "none";
                         patternCanvas.height = 230;
                         patternCanvas.width = 230;
                         var ctxPattern = patternCanvas.getContext('2d');
                         ctxPattern.clearRect(0, 0, patternCanvas.width, patternCanvas.height);



                         var sourceX = 10;
                         var sourceY = 10;
                         var sourceWidth = 230;
                         var sourceHeight = 230;
                         var destWidth = sourceWidth;
                         var destHeight = sourceHeight;
                         var destX = patternCanvas.width  - destWidth;
                         var destY = patternCanvas.height - destHeight;
                         ctxPattern.drawImage(e.target, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);


                         //ctxPattern.drawImage(e.target, 40, 40, 230, 230);
                         ccol.appendChild(patternCanvas);

                       var direction = 'repeat'; var pat = ctx.createPattern(patternCanvas, direction);

                        //alert('drawing');

                       //global variable
                       //window.selectedCategory = 'Casual Tops';
                       if(window.selectedCategoryId == 1)
                            mensFormalShirtFillSmall(ctx,pat);
                       else if(window.selectedCategoryId == 10)
                            womensCasualTopFillSmall(ctx,pat,0.9497206703910615,0.9497206703910615);
                       else if(window.selectedCategoryId == 15)
                            womensLeggings(ctx,pat);
                       else if(window.selectedCategoryId == 4)
                           mensFormalTrouserFillSmall(ctx,pat);

                       //crow.appendChild(ccol);
                       //document.getElementById('tagPreviewContainer').appendChild(crow);

                       c.style.display = 'inline';

                       //top layer img - shadow
                       if(document.getElementById('mqImg') == null){
                            mqImg = document.createElement('img');
                            mqImg.setAttribute('id','mqImg')
                            ccol.appendChild(mqImg);
                       } else {
                            mqImg = document.getElementById('mqImg');
                       }

                       //window.selectedCategory = 'Leggins';
                       if(window.selectedCategoryId == 1){
                            mqImg.style.marginTop = '-2px';
                            mqImg.style.marginLeft = '-5px';
                            mqImg.style.width = '158px';
                            mqImg.style.height = '196px';
                            mqImg.setAttribute('src','img/formalshtoplyers.png');
                       } else if(window.selectedCategoryId == 10) {

                            mqImg.style.marginTop = '7px';
                            mqImg.style.marginLeft = '7px';
                            mqImg.style.width = '160px';
                            mqImg.style.height = '180px';
                            mqImg.setAttribute('src','img/top03d.png');
                            mqImg.style.opacity='1';
                            ccol.style.marginLeft = '-10px';
                            ccol.style.width = '120px';
                            ccol.style.height='140px';
                       } else if(window.selectedCategoryId == 15) {

                            mqImg.style.marginTop = '-4px';
                            mqImg.style.marginLeft = '0px';
                            mqImg.style.width = '73px';
                            mqImg.style.height = '172px';
                            mqImg.setAttribute('src','img/leggins.png');
                            mqImg.style.opacity='1';
                            ccol.style.marginLeft = '40px';
                       } else if(window.selectedCategoryId == 4){
                              mqImg.style.marginTop = '1px';
                              mqImg.style.marginLeft = '-2px';
                              mqImg.style.width = '110px';
                              mqImg.style.height = '167px';
                              mqImg.setAttribute('src','img/trouser.png');
                       }
                       mqImg.style.position = 'absolute';
                       //mqImg.style.width = '155px';
                       //mqImg.style.height = '196px';

                       mqImg.style.zIndex = '10';


                    }*/

                }
                else
                {
                  // it's the same image, we trig the refresh manually.
                  $scope.refreshPreview();
                }

                resolve(true);

              }, function()
              {
                  alert('getImage failed');
                  reject('getImage failed');
              });
            });
          };

           window.ionic.Platform.ready(function() {
                      //alert('Ionic ready... Loading plugins.');

                      $scope.cameraPlus = ( cordova && cordova.plugins && cordova.plugins.CameraPlus ) ? cordova.plugins.CameraPlus : null;
                      //alert($scope.cameraPlus);
                      $scope.switchCapture(true);
                                $scope.switchLiveRefresh(true);
                                //alert('live refresh!');
                                setTimeout(function(){$scope.getImage();},1000);
                    });





          $scope.goToTagHome = function(){
                       $state.go('app.wbtag');
                    };

          $scope.tagProduct = function(){
                                $state.go('app.wbtag');
                             };


        }catch(e){
          alert(e.stack);
        }
  }

})();
