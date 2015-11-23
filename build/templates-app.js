angular.module('templates-app', ['details/details.tpl.html', 'search/search.tpl.html', 'views/browser_support.tpl.html']);

angular.module("details/details.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("details/details.tpl.html",
    "<!--<script type=\"text/javascript\"-->\n" +
    "        <!--language=\"javascript\"-->\n" +
    "        <!--src=\"{{ getGuestRatedSrc() }}\"></script>-->\n" +
    "\n" +
    "<div id=\"campsearch-details\" class=\"campsearch\" ng-show=\"park_details\">\n" +
    "    <div id=\"navigation\" style=\"margin-bottom: 10px;\">\n" +
    "        <a class=\"button\" href=\"{{ config.backendUrl }}/find-a-park/#/?{{ search_query }}\" >Search Again</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <ul id=\"campsearch-details-tabs\" class=\"nav nav-tabs\" style=\"margin-bottom: 5px;\">\n" +
    "        <li data-toggle=\"tab\" href=\"#info-wrapper\" style=\"padding: 3px;\">Info</li>\n" +
    "        <li data-toggle=\"tab\" href=\"#reviews-wrapper\" style=\"padding: 3px;\">Reviews</li>\n" +
    "        <li ng-show=\"park_details.image_paths.length > 0\"\n" +
    "            data-toggle=\"tab\"\n" +
    "            href=\"#photos-wrapper\"\n" +
    "            style=\"padding: 3px;\">Photos</li>\n" +
    "        <li id=\"contactus-tab\" data-toggle=\"tab\" href=\"#contactus-wrapper\" style=\"padding: 3px;\">Contact us</li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <div class=\"tab-content\">\n" +
    "\n" +
    "        <!--PARK INFO-->\n" +
    "        <div class=\"tab-pane fade in active\" id=\"info-wrapper\">\n" +
    "            <div id=\"info\">\n" +
    "                <div id=\"left-pane\" class=\"\" style=\"\">\n" +
    "                    <div id=\"geo-info\"\n" +
    "                         class=\"rounded-box sub-pane\">\n" +
    "\n" +
    "                        <h3 style=\"margin-bottom: 5px;color: #BF5600;\">{{ park_details.title }}</h3>\n" +
    "                        <div id=\"address\">\n" +
    "                            {{ park_details.street }} <br/>\n" +
    "                            {{ park_details.city }}, {{ park_details.province }} {{ park_details.postal_code }}\n" +
    "                            <p>{{ park_details.field_camp_phone_number | phone }}</p>\n" +
    "\n" +
    "                            <div style=\"margin-bottom: 5px;\">\n" +
    "                                <a id=\"contactus-button\" class=\"button\" href=\"\">Contact us</a>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <p>\n" +
    "                            <a href=\"{{(park_details.field_camp_website_url.indexOf('http') > -1)?'':'http://'}}{{ park_details.field_camp_website_url }}\">Visit our website</a> <br/>\n" +
    "                            <a ng-if=\"park_details.field_camp_reservation_website_url\"\n" +
    "                               href=\"{{ park_details.field_camp_reservation_website_url }}\">Make reservation</a> <br/>\n" +
    "                            See map: <a href=\"http://www.google.com/maps?q={{ getMapQuery() | encodeUri }}\">Google Maps</a>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                    <div id=\"gmap\" class=\"rounded-box sub-pane\" style=\"margin-top:5px;padding-left:10px;\">\n" +
    "                        <a target=\"_blank\" href=\"http://www.google.com/maps?q={{ getMapQuery() | encodeUri }}&t=h&z=16\">\n" +
    "                            <img src=\"http://maps.googleapis.com/maps/api/staticmap?center={{ park_details.lat | encodeUri }},{{ park_details.lng | encodeUri }}&zoom=11&size=200x200&markers=color:blue%7Clabel:%7C{{ park_details.lat | encodeUri }},{{ park_details.lng | encodeUri }}&sensor=false\">\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                    <!--<div id=\"report-card\" class=\"rounded-box sub-pane\" style=\"width:225px;margin-top:5px;\">-->\n" +
    "                        <!--<div id=\"ratingScoreRegion\">-->\n" +
    "                        <!--</div>-->\n" +
    "                    <!--</div>-->\n" +
    "                </div>\n" +
    "\n" +
    "                <div id=\"right-pane\" class=\"\">\n" +
    "                    <div id=\"description\">\n" +
    "                        <p>{{ park_details.field_park_description_value }}</p>\n" +
    "                    </div>\n" +
    "                    <div id=\"directions\">\n" +
    "                        <p><span style=\"font-weight:bolder;font-size:13px;\">{{ (park_details.field_camp_directions_value)?'Directions: ':'' }}</span>{{ park_details.field_camp_directions_value }}</p>\n" +
    "                    </div>\n" +
    "                    <div id=\"local_interest\">\n" +
    "                        <p><span style=\"font-weight:bolder;font-size:13px;\">{{ (park_details.field_camp_local_interest_value)?'Local Interest: ':'' }}</span>{{ park_details.field_camp_local_interest_value }}</p>\n" +
    "                    </div>\n" +
    "                    <div id=\"features\">\n" +
    "                        <h2>Features/Specifications</h2>\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <div class=\"col-md-12\"\n" +
    "                                     ng-repeat=\"taxonomy in taxonomiesLeft\">\n" +
    "                                    <h3>{{ taxonomy.title }}</h3>\n" +
    "                                    <ul>\n" +
    "                                        <li ng-repeat=\"value in taxonomy.values\">{{ value }}</li>\n" +
    "                                    </ul>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <div class=\"col-md-12\"\n" +
    "                                     ng-repeat=\"taxonomy in taxonomiesRight\">\n" +
    "                                    <h3>{{ taxonomy.title }}</h3>\n" +
    "                                    <ul>\n" +
    "                                        <li ng-repeat=\"value in taxonomy.values\">{{ value }}</li>\n" +
    "                                    </ul>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!--<div id=\"park-details-ads\">-->\n" +
    "                <!--<div align=\"center\" style=\"\">-->\n" +
    "                    <!--<div class=\"ja-moduletable moduletable\" id=\"Mod174\" style=\"width: 176px;left:-15px;\">-->\n" +
    "                        <!--<h3><span>Click for More Info</span></h3>-->\n" +
    "                        <!--<div class=\"ja-box-ct\">-->\n" +
    "                            <!--<div class=\"bannergroup\">-->\n" +
    "\n" +
    "                                <!--<div class=\"banneritem\">-->\n" +
    "                                    <!--<a href=\"/component/banners/click/138\" target=\"_blank\" title=\"Feedback Survey\">-->\n" +
    "                                        <!--<img src=\"http://camp-california.com/images/banners/12-13Banners/feedback-160x600.jpg\" alt=\"Help us improve how we deilver camping info to you!\">-->\n" +
    "                                    <!--</a>-->\n" +
    "                                    <!--&lt;!&ndash;<div class=\"clr\"></div>&ndash;&gt;-->\n" +
    "                                <!--</div>-->\n" +
    "\n" +
    "                            <!--</div>-->\n" +
    "                        <!--</div>-->\n" +
    "                    <!--</div>-->\n" +
    "                <!--</div>-->\n" +
    "            <!--</div>-->\n" +
    "        </div>\n" +
    "\n" +
    "        <!--PARK REVIEWS-->\n" +
    "        <div class=\"tab-pane fade\" id=\"reviews-wrapper\">\n" +
    "            <div class=\"row\" style=\"margin-bottom:10px;\">\n" +
    "                <div class=\"col-md-12 col-md-offset-1 search-menu-choices\">\n" +
    "                    <button id=\"show-recent-reviews-button\"\n" +
    "                            class=\"active\"\n" +
    "                            type=\"button\">\n" +
    "                        Recent reviews\n" +
    "                    </button>\n" +
    "                    <button id=\"show-user-review-button\"\n" +
    "                            type=\"button\">\n" +
    "\n" +
    "                        Submit your review\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div id=\"recent-reviews\" class=\"row\">\n" +
    "                <iframe id=\"MostRecentReviewsSinglePropertyIFrame\"\n" +
    "                        frameborder=\"0\"\n" +
    "                        scrolling=\"no\"\n" +
    "                        ng-src=\"{{ getGuestRatedRecentReviewsSrc() }}\"\n" +
    "                        width=\"100%\"\n" +
    "                        height=\"1600px\"\n" +
    "                        allowtransparency=\"true\"></iframe>\n" +
    "            </div>\n" +
    "            <div id=\"user-review\" class=\"row\" style=\"display:block;\">\n" +
    "                <div class=\"col-md-offset-1 col-md-11\">\n" +
    "                    <iframe id=\"ctl00_Main_myFrame\"\n" +
    "                            width=\"100%\"\n" +
    "                            height=\"1400\"\n" +
    "                            scrolling=\"no\"\n" +
    "                            frameborder=\"0\"\n" +
    "                            ng-src=\"{{ getGuestRatedSurveySrc() }}\">\n" +
    "                    </iframe>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--PARK PHOTOS-->\n" +
    "        <div class=\"tab-pane fade\" id=\"photos-wrapper\">\n" +
    "            <div style=\"margin:5px 5px 5px 5px;float:left;\" ng-repeat=\"imagePath in park_details.image_paths\">\n" +
    "                <a class=\"group1 cboxElement\" href=\"{{ config.parkImagesUrl }}{{ imagePath.filepath }}\"><img width=\"200px\" height=\"150px\" src=\"{{ config.parkImagesUrl }}{{ imagePath.filepath }}\"></a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--PARK CONTACT-->\n" +
    "        <div class=\"tab-pane fade\" id=\"contactus-wrapper\">\n" +
    "            <!--<div class=\"row\">-->\n" +
    "            <form class=\"form-horizontal\" role=\"form\" style=\"padding: 5px 5px 5px 5px;\">\n" +
    "                <input type=\"hidden\" id=\"park-email\" value=\"{{ park_details.field_camp_email_email }}\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <h3>Contact {{ park_details.title }}</h3>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"contactus-user-email\" class=\"col-md-2 control-label\">Your Email</label>\n" +
    "                    <div class=\"col-md-9\">\n" +
    "                        <input type=\"email\" class=\"form-control\" id=\"contactus-user-email\" placeholder=\"Email\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"contactus-user-message\" class=\"col-md-2 control-label\">Message</label>\n" +
    "                    <div class=\"col-md-9\">\n" +
    "                        <textarea class=\"form-control\" rows=\"5\" id=\"contactus-user-message\"></textarea>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-11\">\n" +
    "                        <button id=\"contactus-sendmail\"\n" +
    "                                type=\"button\"\n" +
    "                                style=\"float:right;\">\n" +
    "                            Submit\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <!--</div>-->\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("search/search.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/search.tpl.html",
    "<div id=\"campsearch-wrapper\" class=\"campsearch\">\n" +
    "    <!-- SEARCH AREA -->\n" +
    "    <form id=\"search-area\" ng-submit=\"CarrySearch(searchScope)\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-7\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-12\">\n" +
    "                        <div id=\"search-type-choices\" class=\"search-menu-choices\">\n" +
    "                            <button type=\"button\"\n" +
    "                                    ng-click=\"ToggleSearchType()\"\n" +
    "                                    ng-class=\"{active: searchType == 'location'}\">General Search</button>\n" +
    "                            <button type=\"button\"\n" +
    "                                    ng-click=\"ToggleSearchType()\"\n" +
    "                                    ng-class=\"{active: searchType == 'park_name'}\">Search by Park Name</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-6\">\n" +
    "                        <h5>Enter Search Terms : </h5>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-6\">\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- SEARCH TEXT INPUT -->\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-12\">\n" +
    "                            <input\n" +
    "                                   class=\"form-control\"\n" +
    "                                   style=\"margin-bottom:5px\"\n" +
    "                                   type=\"text\"\n" +
    "                                   ng-model=\"searchForm.input\"\n" +
    "                                   placeholder=\"{{  (searchType == 'location')?\n" +
    "                                                        'Address, city, state or landmark name in ' + searchScope.locationName:'Park Name'}}\"\n" +
    "                                   autofocus>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-12\">\n" +
    "                        <div class=\"pull-left\">\n" +
    "                            <div id=\"search-option-scope\">\n" +
    "                                <select role=\"menu\"\n" +
    "                                        style=\"width:210px;\"\n" +
    "                                        ng-model=\"searchScope\"\n" +
    "                                        ng-options=\"scope.label for scope in GetScopes()\"\n" +
    "                                        >\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div id=\"search-option-radius\">\n" +
    "                                <select ng-show=\"searchType != 'park_name'\"\n" +
    "                                        style=\"width:210px;\"\n" +
    "                                        ng-model=\"searchForm.options.radius\">\n" +
    "                                    <option ng-repeat=\"r in [15, 20, 25, 30, 40, 50, 100, 200]\" value=\"{{r}}\">\n" +
    "                                        <p>within {{r}} miles</p>\n" +
    "                                    </option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-show=\"searchType == 'location'\" class=\"pull-left\" style=\"margin-left:15px;\">\n" +
    "                            <!--<p style=\"margin:0px;\" ng-show=\"searchType != 'park_name'\"><a ng-click=\"OpenMap(searchScopes.CA)\">Select California region from map</a></p>-->\n" +
    "                            <!--<p style=\"margin:0px;\" ng-show=\"searchType != 'park_name'\"><a ng-click=\"OpenMap(searchScopes.NA)\">Select North American state from map</a></p>-->\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <!--<div class=\"pull-right\">-->\n" +
    "                            <!--<a href=\"http://www.camp-california.com/california-info/770-how-to-use-our-search-tools\">Help</a>-->\n" +
    "                        <!--</div>-->\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-12\">\n" +
    "                        <div style=\"float:right;\">\n" +
    "                            <img src=\"{{config.assetsBackendUrl}}/images/ajax-loader.gif\"\n" +
    "                                 ng-show=\"loading\"\n" +
    "                                 width=\"15px\"\n" +
    "                                 height=\"15px\">\n" +
    "                            <button id=\"search-button\"\n" +
    "                                    type=\"submit\"\n" +
    "                                    class=\"\">Search\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-5\">\n" +
    "                <div id=\"search-option\">\n" +
    "                    <ul class=\"nav nav-tabs nav-stacked\" style=\"list-style-type: none;\">\n" +
    "                        <li class=\"tab-active\" href=\"#park_amenities\" data-toggle=\"tab\">Amenities</li>\n" +
    "                        <li href=\"#park_recreation\" data-toggle=\"tab\">Recreation</li>\n" +
    "                        <li href=\"#park_services\" data-toggle=\"tab\">Services / Options</li>\n" +
    "                        <li href=\"#park_lifestyles\" data-toggle=\"tab\">Lifestyles</li>\n" +
    "                        <li href=\"#park_affiliation\" data-toggle=\"tab\" >Affiliation</li>\n" +
    "                    </ul>\n" +
    "\n" +
    "                    <div class=\"tab-content\">\n" +
    "                        <div ng-repeat=\"(category, options) in searchOptions\"\n" +
    "                             class=\"tab-pane\"\n" +
    "                             ng-class=\"{active: category == 'Park Amenities'}\"\n" +
    "                             id=\"{{category | replace:' ':'_' | lowercase}}\">\n" +
    "\n" +
    "                            <div class=\"checkbox campsearch-checkbox-wrapper\" ng-repeat=\"option in options\">\n" +
    "                                <input type=\"checkbox\"\n" +
    "                                       ng-model=\"option.selected\"> {{option.name}}\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <div class=\"col-md-6\">\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <!-- RESULT AREA -->\n" +
    "    <div id=\"results-area\">\n" +
    "        <div id=\"state-overview\" ng-show=\"state_info && false\">\n" +
    "            <h2>{{searchScope.selectedState.name | capitalizeFirst}} information resources :</h2>\n" +
    "\n" +
    "            <ul class=\"nav nav-tabs\">\n" +
    "                <li class=\"tab-active\" href=\"#overview\" data-toggle=\"tab\">Overview</li>\n" +
    "                <li href=\"#attractions\" data-toggle=\"tab\">Tourist Attractions</li>\n" +
    "                <li href=\"#rules\" data-toggle=\"tab\">Rules of the Road</li>\n" +
    "                <li href=\"#additional_resources\" data-toggle=\"tab\">Additional Resources</li>\n" +
    "            </ul>\n" +
    "\n" +
    "            <div class=\"tab-content\">\n" +
    "                <div class=\"tab-pane active\" id=\"overview\" ng-bind-html=\"state_info.overview\"></div>\n" +
    "                <div class=\"tab-pane\" id=\"attractions\" ng-bind-html=\"state_info.attractions\"></div>\n" +
    "                <div class=\"tab-pane\" id=\"rules\" ng-bind-html=\"state_info.rules\"></div>\n" +
    "                <div class=\"tab-pane\" id=\"additional_resources\" ng-bind-html=\"state_info.additional_resources\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div id=\"error-message\" ng-show=\"resultMessageData.errorMessage\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <h2>{{resultMessageData.errorMessage}}</h2>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"results-wrapper\" ng-show=\"resultParks.length > 0\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-6\">\n" +
    "                    <h2>{{resultMessageData.message}} {{(resultMessageData.message)?':':''}}</h2>\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-12\">\n" +
    "                            {{(Object.keys(selectedTags).length > 0)?'Options :':''}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-12\">\n" +
    "                            <ul>\n" +
    "                                <span ng-repeat=\"(category, tags) in selectedTags\">\n" +
    "                                    <li ng-repeat=\"tag in tags\">\n" +
    "                                        {{tag.name}}\n" +
    "                                    </li>\n" +
    "                                </span>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- PAGINATION -->\n" +
    "                <div class=\"col-md-6\">\n" +
    "                    <!--<div class=\"pagination\" style=\"float:right;\">-->\n" +
    "                        <!--<a ng-repeat=\"page in pagedResultParks\"-->\n" +
    "                           <!--ng-class=\"{'active-page': $index == currentPage}\"-->\n" +
    "                           <!--href=\"\"-->\n" +
    "                           <!--ng-click=\"changePageIndex($index)\"-->\n" +
    "                           <!--style=\"padding-left:5px;padding-right:5px;\">{{$index+1}}</a>-->\n" +
    "                    <!--</div>-->\n" +
    "                    <div style=\"margin-top:20px;margin-bottom:20px;height:25px;\" class=\"pull-right\">\n" +
    "                        | <a  href=\"\"\n" +
    "                            ng-click=\"ToggleShowAll()\">{{(!pagination.showAllResults)?'View All':'Paginate'}}</a>\n" +
    "                    </div>\n" +
    "                    <pagination total-items=\"resultParks.length\"\n" +
    "                                page=\"pagination.currentPage\"\n" +
    "                                items-per-page=\"pagination.resultPerPage\"\n" +
    "                                max-size=\"'5'\"\n" +
    "                                class=\"pagination-custom pull-right\"\n" +
    "                                boundary-links=\"true\"\n" +
    "                                rotate=\"false\"\n" +
    "                                num-pages=\"pagination.numberOfPages\">\n" +
    "                    </pagination>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"result-rowset\">\n" +
    "                <div class=\"result-row\" ng-repeat=\"park in pagedResultParks[pagination.currentPage-1] | orderBy:name\">\n" +
    "                    <div class=\"pull-left\">\n" +
    "                        <a ng-href=\"{{getParkDetailUrl(park)}}\" ng-click=\"ParkResultOnClick(getParkDetailUrl(park))\">\n" +
    "                        <img width=\"150px\"\n" +
    "                             height=\"100px\"\n" +
    "                             class=\"pull-left\"\n" +
    "                             style=\"margin-right:10px;\"\n" +
    "                             ng-src=\"{{park.thumbnail_path || park.alternate_thumbnail_path || park.no_thumbnail_path}}\">\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                    <div class=\"result-title\">\n" +
    "                        <div style=\"float:right;position:relative; top:-2px;\">\n" +
    "                            <iframe ng-if=\"park.guestreview_id\"\n" +
    "                                                          id=\"SearchResultRatingIFrame\"\n" +
    "                                                          class=\"pull-right\"\n" +
    "                                                          frameborder=\"0\"\n" +
    "                                                          scrolling=\"no\"\n" +
    "                                                          ng-src=\"{{park.guestreview_snippet_url}}\"\n" +
    "                                                          width=\"200px\"\n" +
    "                                                          height=\"50px\"\n" +
    "                                                          allowtransparency=\"true\" >\n" +
    "                            </iframe>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <h3 style=\"margin-bottom:0px;margin-top:0px;\"><a ng-href=\"{{getParkDetailUrl(park)}}\"\n" +
    "                                           ng-click=\"ParkResultOnClick(getParkDetailUrl(park.name))\">{{park.name}}</a></h3>\n" +
    "                        <div class=\"result-address\">\n" +
    "                            {{park.street}} <br/>\n" +
    "                            {{park.city}}, {{park.province}} {{park.postal_code}} {{(park.distance)? '| ' + (park.distance | number:2) + ((park.distance >= 2)?' miles':' mile'):''}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"result-description\" style=\"margin-top:10px;\">\n" +
    "                        {{park.description}}\n" +
    "                    </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-md-12\">\n" +
    "                <!-- PAGINATION -->\n" +
    "                <!--<div class=\"col-md-6\">-->\n" +
    "                    <!--<div class=\"pagination\" style=\"float:right;\">-->\n" +
    "                    <!--<a ng-repeat=\"page in pagedResultParks\"-->\n" +
    "                    <!--ng-class=\"{'active-page': $index == currentPage}\"-->\n" +
    "                    <!--href=\"\"-->\n" +
    "                    <!--ng-click=\"changePageIndex($index)\"-->\n" +
    "                    <!--style=\"padding-left:5px;padding-right:5px;\">{{$index+1}}</a>-->\n" +
    "                    <!--</div>-->\n" +
    "                    <div style=\"margin-top:20px;margin-bottom:20px;height:25px;\" class=\"pull-right\">\n" +
    "                        | <a  href=\"\"\n" +
    "                              ng-click=\"ToggleShowAll()\">{{(!pagination.showAllResults)?'View All':'Paginate'}}</a>\n" +
    "                    </div>\n" +
    "                    <pagination total-items=\"resultParks.length\"\n" +
    "                                page=\"pagination.currentPage\"\n" +
    "                                items-per-page=\"pagination.resultPerPage\"\n" +
    "                                max-size=\"'5'\"\n" +
    "                                class=\"pagination-custom pull-right\"\n" +
    "                                boundary-links=\"true\"\n" +
    "                                rotate=\"false\"\n" +
    "                                num-pages=\"pagination.numberOfPages\">\n" +
    "                    </pagination>\n" +
    "                <!--</div>-->\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"ca-regions-map-modal.html\">\n" +
    "        <div id=\"ca-regions-map-wrapper\" ng-show=\"searchScope.location == 'CA'\" style=\"\">\n" +
    "            <div style=\"width:500px;display:block;margin:auto;\">\n" +
    "                <img id=\"map_ca\"\n" +
    "                     width=\"500\"\n" +
    "                     height=\"573\"\n" +
    "                     border=\"0\"\n" +
    "                     usemap=\"#MapState_2013121342401635225353544018174\"\n" +
    "                     ng-src=\"{{config.assetsBackendUrl}}/images/ca_region_map.jpg\"\n" +
    "                     style=\"\">\n" +
    "                <map id=\"ca-regions-map\" name=\"MapState_2013121342401635225353544018174\">\n" +
    "                    <!-- #$-:Image map file created by GIMP Image Map plug-in -->\n" +
    "                    <!-- #$-:GIMP Image Map plug-in by Maurits Rijk -->\n" +
    "                    <!-- #$-:Please do not edit lines starting with \"#$\" -->\n" +
    "                    <!-- #$VERSION:2.3 -->\n" +
    "                    <!-- #$AUTHOR:Patrice Paquette -->\n" +
    "                    <area shape=\"poly\" coords=\"56,6,208,8,208,43,164,43,164,61,209,62,208,102,156,103,142,109,138,114,132,123,81,123,78,115,55,116,53,90,51,67,58,66,60,63,60,61,56,38,48,36,50,20\" alt=\"shasta_cascade_trinity\" ng-click=\"ChangeRegion('shasta_cascade_trinity')\" target=\"shasta_cascade_trinity\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"157,106,208,106,208,124,186,124,186,143,208,143,207,183,234,205,191,205,179,165,183,147,161,145,153,137,151,128,151,107\" alt=\"high_sierra\" ng-click=\"ChangeRegion('high_sierra')\" target=\"high_sierra\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"194,224,255,224,301,265,304,331,303,341,310,371,310,378,305,388,305,397,298,409,291,409,279,407,280,394,272,386,277,371,265,363,269,347,275,347,275,329,266,329,233,285,232,277,223,265,223,258,204,255,202,239,196,235,194,228\" alt=\"high_sierra\" ng-click=\"ChangeRegion('high_sierra')\" target=\"high_sierra\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"303,267,467,410,467,417,476,427,482,442,493,450,481,461,480,467,475,470,477,495,472,501,468,502,468,511,472,526,480,527,483,533,479,536,480,540,476,541,473,540,470,543,405,552,406,545,377,492,415,491,414,472,372,473,371,462,366,450,355,441,312,436,308,425,276,423,278,410,294,412,301,410,308,397,307,389,312,378,312,365,305,339,307,328\" alt=\"the_the_deserts\" ng-click=\"ChangeRegion('the_deserts')\" target=\"the_deserts\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"386,554,403,552,404,544,384,512,349,508,336,503,330,509,340,521,347,533,347,543,386,543\" alt=\"san_diego_area\" ng-click=\"ChangeRegion('san_diego_area')\" target=\"san_diego_area\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"303,489,316,477,326,488,334,502,328,508,320,503,320,498,313,498\" alt=\"orange_county\" ng-click=\"ChangeRegion('orange_county')\" target=\"orange_county\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"313,439,345,442,353,443,364,452,369,462,369,472,329,473,329,487,319,475,321,472\" alt=\"inland_empire\" ng-click=\"ChangeRegion('inland_empire')\" target=\"inland_empire\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"332,492,375,492,382,509,350,505,336,501\" alt=\"inland_empire\" ng-click=\"ChangeRegion('inland_empire')\" target=\"inland_empire\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"236,424,306,427,318,472,301,487,293,487,292,490,288,489,289,484,286,477,286,476,296,475,296,455,248,456,246,443\" alt=\"los_angeles_area\" ng-click=\"ChangeRegion('los_angeles_area')\" target=\"los_angeles_area\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"111,299,112,297,117,296,134,302,138,301,143,296,186,365,199,389,216,410,234,425,244,444,246,456,239,456,233,452,226,450,222,452,211,450,209,448,193,447,188,449,180,441,180,437,181,436,178,430,181,426,177,419,180,418,179,409,175,405,171,406,167,403,167,400,170,398,166,389,160,389,160,388,164,388,164,369,144,369,140,365,141,362,139,358,139,356,135,356,129,346,123,342,121,339,118,328,118,322,121,323,124,320,126,311,121,300,115,299,111,302\" alt=\"central_coast\" ng-click=\"ChangeRegion('central_coast')\" target=\"central_coast\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"160,147,181,149,176,165,188,204,177,205,177,224,192,224,193,233,195,237,199,241,200,257,220,260,221,268,229,278,230,286,232,291,221,298,162,227,159,219,159,202,147,167\" alt=\"gold_country\" ng-click=\"ChangeRegion('gold_country')\" target=\"gold_country\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"83,126,135,125,139,115,146,109,149,109,147,130,152,140,159,145,144,164,144,172,156,203,157,221,161,232,197,275,200,281,204,282,221,302,223,301,235,293,263,329,193,329,194,348,266,347,262,356,262,364,273,373,270,385,277,398,274,423,232,421,211,401,199,385,178,346,165,325,143,293,144,272,138,253,112,236,106,225,115,214,115,209,101,183,97,172,93,167,90,142\" alt=\"central_valley\" ng-click=\"ChangeRegion('central_valley')\" target=\"central_valley\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"75,226,105,226,110,238,122,247,125,247,136,256,140,272,141,295,135,301,117,293,111,295,108,299,102,292,107,292,107,272,96,272,95,268,93,268,93,254,96,253,96,264,102,266,103,270,108,270,110,274,118,274,120,272,119,270,114,269,111,268,110,264,110,259,106,252,103,251,103,246,99,242,105,238,104,235,98,230,93,234,91,248,85,242,81,242,79,239,76,237,73,231,78,235,79,233\" alt=\"san_francisco_bay_area\" ng-click=\"ChangeRegion('san_francisco_bay_area')\" target=\"san_francisco_bay_area\"  nohref=\"nohref\" />\n" +
    "                    <area shape=\"poly\" coords=\"26,6,54,6,48,18,46,36,49,40,54,40,58,62,48,67,53,118,76,117,88,143,89,156,90,158,91,168,96,174,100,187,113,210,112,213,104,224,73,224,65,211,54,202,80,202,80,181,40,182,41,177,42,172,39,167,37,157,37,153,40,148,36,129,25,113,14,104,15,102,13,92,19,80,22,80,24,75,28,72,28,69,25,68,29,62,29,59,25,56,32,37,28,16,24,16\" alt=\"north_coast\" ng-click=\"ChangeRegion('north_coast')\" target=\"north_coast\"  nohref=\"nohref\" />\n" +
    "\n" +
    "                </map>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div id=\"americas-map-wrapper\" ng-show=\"searchScope.location == 'NA'\" style=\"width:452px;display:block;margin:auto;\">\n" +
    "            <img width=\"452\"\n" +
    "                 height=\"605\"\n" +
    "                 border=\"0\"\n" +
    "                 usemap=\"#master-map\"\n" +
    "                 id=\"map_us\"\n" +
    "                 ng-src=\"{{config.assetsBackendUrl}}/images/MapVectorHome.gif\"\n" +
    "                 name=\"MapVector\"\n" +
    "                 style=\"\">\n" +
    "            <map name=\"master-map\">\n" +
    "                <area ng-click=\"ChangeRegion('Prince Edward Island')\" alt=\"Prince Edward Island\" title=\"Prince Edward Island\"  coords=\"425,232,440,232,440,242,425,242,425,232\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Maryland')\" alt=\"Maryland\" title=\"Maryland\"  coords=\"396,408,408,408,408,415,396,415,396,408\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Deleware')\" alt=\"Deleware\" title=\"Deleware\"  coords=\"400,398,413,398,413,406,400,406,400,398\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('New Jersey')\" alt=\"New Jersey\" title=\"New Jersey\"  coords=\"400,388,414,388,414,396,400,396,400,388\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Connecticut')\" alt=\"Connecticut\" title=\"Connecticut\"  coords=\"406,380,417,380,417,388,406,388,406,380\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Rhode Island')\" alt=\"Rhode Island\" title=\"Rhode Island\"  coords=\"410,370,423,370,423,378,410,378,410,370\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Massachusetts')\" alt=\"Massachusetts\" title=\"Massachusetts\"  coords=\"409,358,422,358,422,366,409,366,409,358\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('New Hampshire')\" alt=\"New Hampshire\" title=\"New Hampshire\"  coords=\"374,323,387,323,387,331,374,331,374,323\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Vermont')\" alt=\"Vermont\" title=\"Vermont\"  coords=\"360,329,373,329,373,338,360,338,360,329\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Hawaii')\" alt=\"Hawaii\" title=\"Hawaii\"  coords=\"90,475,102,470,117,478,140,488,154,505,147,508,143,511,139,511,137,498,130,492,122,486,112,480,100,477,90,478,90,475\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Maine')\" alt=\"Maine\" title=\"Maine\"  coords=\"396,327,395,329,394,333,393,341,391,345,394,355,396,361,397,360,400,356,404,351,408,347,413,343,407,335,404,329,401,326,396,327\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('New Hampshire')\" alt=\"New Hampshire\" title=\"New Hampshire\"  coords=\"390,346,395,360,397,362,396,363,388,366,389,359,388,346,390,346\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Vermont')\" alt=\"Vermont\" title=\"Vermont\"  coords=\"379,351,388,348,389,353,387,366,384,367,379,351\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('New York')\" alt=\"New York\" title=\"New York\"  coords=\"379,351,372,353,365,361,366,365,364,368,351,370,353,374,350,379,352,380,373,376,379,380,383,381,385,379,384,367,379,351\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Massachusetts')\" alt=\"Massachusetts\" title=\"Massachusetts\"  coords=\"384,368,384,373,394,370,398,372,402,371,397,364,384,368\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Rhode Island')\" alt=\"Rhode Island\" title=\"Rhode Island\"  coords=\"394,371,395,376,399,374,394,371\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Connecticut')\" alt=\"Connecticut\" title=\"Connecticut\"  coords=\"393,372,384,373,386,380,394,376,393,372\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('New Jersey')\" alt=\"New Jersey\" title=\"New Jersey\"  coords=\"378,381,383,382,385,385,385,393,383,397,379,396,377,394,379,388,377,386,378,381\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Pennsylvania')\" alt=\"Pennsylvania\" title=\"Pennsylvania\"  coords=\"345,381,349,379,351,381,373,376,378,380,377,386,379,389,376,393,358,397,348,397,346,397,345,381\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Delaware')\" alt=\"Delaware\" title=\"Delaware\"  coords=\"377,396,383,401,382,405,376,400,374,396,377,392,377,396\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Maryland')\" alt=\"Maryland\" title=\"Maryland\"  coords=\"380,409,373,403,374,397,376,397,378,403,381,403,381,409,380,409\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Virgina')\" alt=\"Virgina\" title=\"Virgina\"  coords=\"361,400,360,404,356,408,354,411,353,415,350,417,341,419,336,425,380,418,378,414,376,410,365,399,361,400\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('West Virginia')\" alt=\"West Virginia\" title=\"West Virginia\"  coords=\"346,397,346,401,338,412,342,417,344,418,349,417,352,412,355,407,360,402,360,398,355,402,354,402,354,399,348,398,346,397\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('North Carolina')\" alt=\"North Carolina\" title=\"North Carolina\"  coords=\"331,439,337,438,347,435,352,436,361,436,367,441,371,441,373,437,377,433,380,430,383,423,380,418,346,425,330,437,331,439\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('South Carolina')\" alt=\"South Carolina\" title=\"South Carolina\"  coords=\"338,439,343,436,352,436,360,437,367,442,363,450,355,458,345,447,338,439\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Florida')\" alt=\"Florida\" title=\"Florida\"  coords=\"314,473,328,471,332,473,350,473,351,470,354,471,368,497,368,506,366,510,364,510,358,503,352,498,350,491,349,484,342,479,336,476,332,480,328,479,326,476,319,475,314,476,314,473\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Georgia')\" alt=\"Georgia\" title=\"Georgia\"  coords=\"323,440,337,439,354,459,353,466,351,469,349,473,331,471,330,469,323,440\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Alabama')\" alt=\"Alabama\" title=\"Alabama\"  coords=\"307,442,322,441,327,458,328,463,329,470,314,472,314,477,308,477,307,471,307,442\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Mississippi')\" alt=\"Mississippi\" title=\"Mississippi\"  coords=\"294,443,306,442,307,471,307,477,301,478,299,476,294,474,287,474,290,463,288,459,289,451,294,443\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Tennessee')\" alt=\"Tennessee\" title=\"Tennessee\"  coords=\"299,431,307,430,312,429,344,425,343,427,337,432,331,435,329,439,295,441,296,437,299,431\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Kentucky')\" alt=\"Kentucky\" title=\"Kentucky\"  coords=\"337,411,341,417,334,425,306,428,305,429,299,430,299,427,305,420,315,418,323,410,324,408,337,411\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Ohio')\" alt=\"Ohio\" title=\"Ohio\"  coords=\"321,388,330,386,335,388,345,382,345,401,341,405,338,411,330,410,323,407,321,388\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Indiana')\" alt=\"Indiana\" title=\"Indiana\"  coords=\"306,390,320,388,323,410,320,411,318,417,312,418,305,419,306,409,306,390\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Michigan')\" alt=\"Michigan\" title=\"Michigan\"  coords=\"316,356,314,360,310,367,310,376,312,382,309,389,328,386,333,379,333,373,331,369,329,367,326,371,325,370,327,363,325,358,316,356\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Louisiana')\" alt=\"Louisiana\" title=\"Louisiana\"  coords=\"270,460,288,460,289,462,289,466,286,473,286,475,297,474,300,478,295,479,295,481,300,483,296,486,291,487,287,484,282,485,278,485,275,481,273,484,273,476,272,469,270,466,270,460\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Arkansas')\" alt=\"Arkansas\" title=\"Arkansas\"  coords=\"266,433,293,432,294,435,294,440,290,448,288,453,288,459,270,459,269,455,267,454,266,433\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Illinois')\" alt=\"Illinois\" title=\"Illinois\"  coords=\"287,385,303,383,305,390,307,411,306,416,304,422,300,425,298,426,296,421,292,418,290,412,286,408,283,402,286,394,290,390,287,385\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Missouri')\" alt=\"Missouri\" title=\"Missouri\"  coords=\"258,401,283,400,284,406,289,412,292,413,291,419,296,422,298,427,299,429,297,431,295,435,293,431,267,432,266,413,262,408,264,406,258,401\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Wisconsin')\" alt=\"Wisconsin\" title=\"Wisconsin\"  coords=\"274,359,274,362,275,367,283,374,284,381,287,384,293,384,302,384,302,377,303,369,304,365,305,362,305,357,322,353,318,351,313,349,304,351,297,349,301,345,296,345,290,350,285,353,283,350,277,352,274,359\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Iowa')\" alt=\"Iowa\" title=\"Iowa\"  coords=\"254,377,283,378,284,383,290,388,289,392,285,394,284,400,258,400,256,390,254,385,254,377\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Texas')\" alt=\"Texas\" title=\"Texas\"  coords=\"214,433,232,433,231,446,237,451,242,451,247,454,252,453,257,454,261,453,266,455,270,457,270,467,272,472,273,473,273,477,272,483,271,485,268,486,264,485,265,487,263,490,261,492,258,493,254,493,251,497,249,499,248,502,246,504,247,510,249,513,247,515,242,513,237,510,234,505,231,499,227,492,222,485,215,483,212,485,209,489,200,483,199,477,190,467,211,467,214,433\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Oklahoma')\" alt=\"Oklahoma\" title=\"Oklahoma\"  coords=\"214,428,265,429,265,436,266,440,267,454,263,452,257,453,255,454,252,452,248,452,245,452,239,450,235,448,233,447,232,432,215,432,214,428\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Kansas')\" alt=\"Kansas\" title=\"Kansas\"  coords=\"222,405,263,406,262,408,265,412,265,428,221,428,222,405\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Colorado')\" alt=\"Colorado\" title=\"Colorado\"  coords=\"181,393,221,397,220,427,178,424,181,393\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Nebraska')\" alt=\"Nebraska\" title=\"Nebraska\"  coords=\"211,382,252,383,255,389,258,402,261,405,222,404,222,397,211,396,211,382\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('South Dakota')\" alt=\"South Dakota\" title=\"South Dakota\"  coords=\"213,357,252,359,253,363,254,370,253,384,249,383,243,382,212,381,213,357\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Wyoming')\" alt=\"Wyoming\" title=\"Wyoming\"  coords=\"173,362,212,365,210,395,170,391,173,362\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('New Mexico')\" alt=\"New Mexico\" title=\"New Mexico\"  coords=\"178,425,213,428,211,466,188,465,177,465,177,468,172,468,178,425\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Arizona')\" alt=\"Arizona\" title=\"Arizona\"  coords=\"147,420,177,425,171,467,158,465,137,453,137,450,141,442,143,439,141,437,141,429,142,427,146,426,147,420\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Utah')\" alt=\"Utah\" title=\"Utah\"  coords=\"154,382,170,385,169,392,181,394,177,424,148,419,154,382\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Nevada')\" alt=\"Nevada\" title=\"Nevada\"  coords=\"121,374,154,382,145,426,142,425,140,432,115,397,121,374\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('California')\" alt=\"California\" title=\"California\"  coords=\"97,368,121,374,114,397,140,434,140,438,142,440,140,442,137,448,138,450,136,451,122,449,120,443,105,430,104,428,104,421,99,414,100,409,98,408,98,404,96,396,94,391,95,385,93,381,97,368\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Alaska')\" alt=\"Alaska\" title=\"Alaska\"  coords=\"37,390,51,392,65,394,77,434,86,438,91,434,103,442,110,444,112,451,109,451,106,451,93,442,90,443,78,440,70,439,61,438,61,442,54,447,51,444,50,447,48,452,40,461,36,464,25,468,27,463,36,457,38,451,32,449,29,450,27,444,21,441,19,436,23,428,31,426,28,424,20,422,17,416,26,412,26,409,21,405,23,401,28,400,29,397,32,395,37,390\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Minnesota')\" alt=\"Minnesota\" title=\"Minnesota\"  coords=\"251,336,260,335,265,337,272,337,278,341,289,341,283,347,277,353,274,359,274,367,282,373,284,377,255,377,253,363,251,336\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('North Dakota')\" alt=\"North Dakota\" title=\"North Dakota\"  coords=\"250,336,250,342,253,358,213,357,215,335,250,336\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Montana')\" alt=\"Montana\" title=\"Montana\"  coords=\"214,334,212,364,174,362,165,362,153,335,154,326,214,334\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Idaho')\" alt=\"Idaho\" title=\"Idaho\"  coords=\"147,325,145,347,141,357,136,377,152,380,170,382,173,362,165,362,157,344,152,334,154,325,147,325\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Oregon')\" alt=\"Oregon\" title=\"Oregon\"  coords=\"107,337,113,344,144,349,141,354,141,363,137,377,97,367,107,337\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Newfoundland and Labrador')\" alt=\"Newfoundland and Labrador\" title=\"Newfoundland and Labrador\"  coords=\"337,168,346,178,357,190,361,197,353,203,350,208,358,214,365,215,370,213,388,201,400,192,389,187,379,184,368,185,354,176,337,168\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Quebec')\" alt=\"Quebec\" title=\"Quebec\"  coords=\"291,177,295,188,299,202,312,215,306,228,314,247,321,271,334,280,347,279,353,283,368,276,371,257,372,249,385,241,384,234,370,241,370,232,391,228,390,225,394,216,397,199,404,221,408,228,422,219,435,213,433,204,421,200,412,205,405,200,401,195,386,203,379,210,371,214,369,217,359,216,351,212,349,203,359,198,353,189,346,179,336,170,336,185,330,186,323,175,307,171,291,177\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Washington')\" alt=\"Washington\" title=\"Washington\"  coords=\"108,320,117,323,119,318,147,324,146,333,145,348,128,345,116,344,112,338,108,337,108,320\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Nova Scotia')\" alt=\"Nova Scotia\" title=\"Nova Scotia\"  coords=\"394,252,401,248,406,240,408,234,414,236,410,248,402,258,402,269,397,270,393,264,394,252\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Prince Edward Island')\" alt=\"Prince Edward Island\" title=\"Prince Edward Island\"  coords=\"401,240,390,245,394,249,402,246,401,240\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('New Brunswick')\" alt=\"New Brunswick\" title=\"New Brunswick\"  coords=\"385,241,392,248,395,251,391,262,383,265,375,256,372,255,372,249,385,241\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Ontario')\" alt=\"Ontario\" title=\"Ontario\"  coords=\"253,285,266,286,280,286,285,278,295,282,301,289,310,291,326,293,322,296,322,308,319,317,322,318,333,310,338,303,343,295,354,284,349,279,336,282,321,272,314,250,300,239,294,230,279,230,268,224,249,256,253,285\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Manitoba')\" alt=\"Manitoba\" title=\"Manitoba\"  coords=\"219,208,243,206,246,214,250,214,255,224,268,224,248,256,251,283,222,286,219,208\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Saskatchewan')\" alt=\"Saskatchewan\" title=\"Saskatchewan\"  coords=\"221,285,218,208,191,206,182,283,221,285\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Alberta')\" alt=\"Alberta\" title=\"Alberta\"  coords=\"190,207,181,284,160,280,163,269,146,241,156,201,190,207\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('British Columbia')\" alt=\"British Columbia\" title=\"British Columbia\"  coords=\"97,174,100,185,108,187,106,206,112,213,105,226,108,237,110,245,105,254,115,273,121,271,161,280,163,271,144,242,156,201,97,174\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Yukon')\" alt=\"Yukon\" title=\"Yukon\"  coords=\"129,117,93,169,115,184,141,195,130,137,136,125,129,117\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Northwest Territories')\" alt=\"Northwest Territories\" title=\"Northwest Territories\"  coords=\"137,126,160,125,172,137,170,147,186,167,215,180,217,207,180,204,144,195,135,177,131,138,137,126\" shape=\"poly\">\n" +
    "                <area ng-click=\"ChangeRegion('Nunavut')\" alt=\"Nunavut\" title=\"Nunavut\"  coords=\"244,39,225,64,205,79,182,91,169,115,174,138,171,149,187,169,216,180,218,206,242,206,253,181,271,181,279,186,289,184,292,177,303,171,327,166,326,151,321,125,288,112,257,97,256,48,252,40,244,39\" shape=\"poly\">\n" +
    "            </map>\n" +
    "        </div>\n" +
    "    </script>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("views/browser_support.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/browser_support.tpl.html",
    "<div>\n" +
    "    Hello! It seems that your browser is too old to support this functionality. Please\n" +
    "    consider downloading the latest version of\n" +
    "    <a href=\"https://www.google.com/intl/en/chrome/browser/\">Chrome</a>,\n" +
    "    <a href=\"http://www.mozilla.org/en-US/firefox/new/\">Firefox</a>, or\n" +
    "    <a href=\"http://windows.microsoft.com/en-ca/internet-explorer/ie-10-worldwide-languages\">Internet Explorer</a>.\n" +
    "</div>");
}]);
