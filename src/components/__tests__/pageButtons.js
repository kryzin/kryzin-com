import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import PageButtons from "../pageButtons";

describe("PageButtons ", () => {
    it("renders correctly", () => {
        const container = render(<PageButtons />)
        expect(container).toMatchSnapshot()
    })
})