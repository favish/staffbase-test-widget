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
import htmlParser from 'html-react-parser';
import {BlockAttributes} from "widget-sdk";
import {useArticleData} from "./hooks/useArticleData";

/**
 * React Component
 */
export interface TestWidgetProps extends BlockAttributes {
  message: string;
}

export const TestWidget = ({message, contentLanguage}: TestWidgetProps): ReactElement => {

  // Get the article data from API
  const articleData = useArticleData('66ce0559b660075a0efc7800', 'en_US')

  return <div>
    <div>Hello {message} {contentLanguage}</div>
    <div data-widget-on-card="true" data-widget-type="FileList"
         data-widget-src="internal://staffbase.content.widgets.FileList">
      <ul>
        <li data-type="webp" data-update-time="2024-09-06T00:00:00-05:00"><a
          href="https://cdn-de1.staffbase.rocks/t1-backend/image/upload/v1725640188/QHC3oZ729l4FRoGsxlK0voiBHVowPII0gLAiRICjqfHUYvA91P1zA417Cn18b6cue8G1yimOtItNrUMLBJ4NJ0EOL8o84RiksE5o77pHOKGF5RD32zaE3hLtMahfQbodNveEbfTrDBRcmEbVUgOLSIPL3GsmhJDq4rjRSS1u5TL3GstIisc4tBj069UuFsqJ/image.webp">image.webp</a>
        </li>
        <li data-type="webp" data-update-time="2024-09-06T00:00:00-05:00"><a
          href="https://cdn-de1.staffbase.rocks/t1-backend/image/upload/v1725639354/wlnWconFGzKpmOZjC4oqPKtb2vS60h8pwItCnozY3lkTjQDkMAJa8I20Y98GH7ZHpJXDT0KkNDLXv96nn3BoO7gXbf0AbwDnHdtySmfK2I0mpUU26XGh8Bwyt0aKIi9uvPdKq7Vzs4RUTlmGsv39ocAdKaKboKZoGPmuvf8HNBBG9zXOQEmZGFtUVGYI207J/image.webp">image.webp</a>
        </li>
      </ul>
    </div>
    <h3>Article Content using html-react-parser</h3>
    <div>{htmlParser(articleData?.content || '')}</div>
    <h3>Article Content using dangerouslySetInnerHTML</h3>
    <div dangerouslySetInnerHTML={{__html: articleData?.content as string}}/>
    <div>End Widget</div>
    <hr />
  </div>
};

