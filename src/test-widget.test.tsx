import React from "react"
import {screen, render} from "@testing-library/react"

import {TestWidget} from "./test-widget";

describe("TestWidget", () => {
    it("should render the component", () => {
        render(<TestWidget contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
