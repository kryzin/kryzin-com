import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { render } from "@testing-library/react"

import Metadata from '../metadata';

describe("Metadata component", () => {
    beforeAll(() => {
        useStaticQuery.mockReturnValue({
          site: {
            siteMetadata: {
              title: `Gatsby Blog`,
              description: `A starter blog testing.`,
            },
            }
        },)
    })

    it("renders tests correnctly", () => {
        const mockTitle = `Gatsby Blog`
        const mockDescription = `A starter blog testing.`
    })
})