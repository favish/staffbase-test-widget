/*!
 * Copyright 2024, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {ReactElement} from "react";
import {BlockAttributes} from "widget-sdk";

/**
 * React Component
 */
export interface TestWidgetProps extends BlockAttributes {
  message: string;
}

export const TestWidget = ({message, contentLanguage}: TestWidgetProps): ReactElement => {
  return <div>
    <div data-widget-type="Section" data-widget-conf-grid-type="50-50"
         data-widget-src="internal://staffbase.content.widgets.Section">
      <div data-widget-type="NewsStage" data-widget-conf-design="2" data-widget-conf-layout="gradient"
           data-widget-conf-effect="slide" data-widget-conf-limit="5"
           data-widget-conf-show-arrows="true" data-widget-conf-show-dots="true"
           data-widget-conf-show-channel-names="false" data-widget-conf-show-kicker="true"
           data-widget-conf-show-teaser="false" data-widget-conf-show-social-actions="false"
           data-widget-conf-autoplay="true" data-widget-conf-channel-id="5e431009d1e520b20267f7c1"
           data-widget-conf-hide-if-empty="true" data-widget-conf-render-static-for-single-entry="true"
           data-widget-src="internal://staffbase.content.widgets.NewsStage">
      </div>
      <div></div>
    </div>
    <div data-widget-conf-secondary-column-mode="true" data-widget-conf-open-in-mobile-browser="false"
         data-widget-type="QuickLinks" data-widget-on-card="true"
         data-widget-conf-design="2" data-widget-conf-type="list"
         data-widget-src="internal://staffbase.content.widgets.QuickLinks">
      <ul>
        <li>
          <a href="https://app.maximize-it.eu/settings/groups" data-title="Open Groups Chooser" tabindex="0">Open
          Groups Chooser</a>
        </li>
      </ul>
    </div>
    <div>Hello {message} {contentLanguage}</div>
  </div>
};

