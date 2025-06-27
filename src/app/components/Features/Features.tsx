'use client'

import React, { useState } from 'react'
import data from "../../data/data.json"

const Features = () => {

  return (
    <section data-section="Features" id="features" className="section">
      <div className="sticky-section">
        <div className="container wide-container">
          <div className="w-layout-grid grid-6-col">
            <div
              id="w-node-_0f99c55c-aef0-ebd9-f690-9830ff12bd17-5ffe7f77"
              className="trusted-content"
            >
              <div className="content-sticky">
                <div className="fade-in-on-scroll">
                  <h1 className="title smaller">{data.features_heading_1}</h1>
                </div>
                <div className="fade-in-on-scroll">
                  <p>
                   { data.features_text_1}
                  </p>
                </div>
              </div>
            </div>
            <div
              id="w-node-_0f99c55c-aef0-ebd9-f690-9830ff12bd1f-5ffe7f77"
              className="trusted-content trusted-list"
            >
              <div className="trusted-overlay-container">
                <div className="trusted-white-overlay"></div>
                <div className="trusted-white-overlay bottom"></div>
              </div>
              <div className="trusted-item">
                <div className="trusted-item-header">
                  <h2 className="trusted-no">{data.features_trusted_no_1}</h2>
                  <div className="card-title">
                    <strong>{data.features_card_title_1}</strong>
                  </div>
                </div>
                <div className="fade-in-on-scroll">
                  <p>
                    {data.features_text_2}
                  </p>
                </div>
              </div>
              <div className="trusted-item">
                <div className="trusted-item-header">
                  <h2 className="trusted-no">{data.features_trusted_no_2}</h2>
                  <div className="card-title">
                    <strong> {data.features_card_title_2}</strong>
                  </div>
                </div>
                <div className="fade-in-on-scroll">
                  <p>
                    {data.features_text_3}
                  </p>
                </div>
              </div>
              <div className="trusted-item">
                <div className="trusted-item-header">
                  <h2 className="trusted-no">{data.features_trusted_no_3}</h2>
                  <div className="card-title">
                    <strong>{data.features_card_title_3}</strong>
                  </div>
                </div>
                <div className="fade-in-on-scroll">
                  <p>
                    {data.features_text_4}
                  </p>
                </div>
              </div>
              <div className="trusted-item last">
                <div className="trusted-item-header">
                  <h2 className="trusted-no">{data.features_trusted_no_4}</h2>
                  <div className="card-title">
                    <strong>{data.features_card_title_4}</strong>
                  </div>
                </div>
                <div className="fade-in-on-scroll">
                  <p>
                    {data.features_text_5}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features
