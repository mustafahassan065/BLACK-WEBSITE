import React from 'react'
import data from "../../data/data.json"

const Footer = () => {
  return (
    <footer className="footer">

      <div className="container">
        <div className="footer-social-media-container">
          <div className="social-media-content">
            <div className="fade-in-on-scroll">
              <div>{data.footer_head}</div>
            </div>
            <a href="https://instagram.com" target="_blank" className="social-media-link w-inline-block">
              <img src={data.footer_instagram}
               loading="lazy" alt="" className="social-media-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" className="social-media-link w-inline-block">
              <img src={data.footer_twitter}
               loading="lazy" alt="" className="social-media-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" className="social-media-link w-inline-block">
              <img src={data.footer_linkedin}
               loading="lazy" alt="" className="social-media-icon" />
            </a>
            <a href="https://facebook.com" target="_blank" className="social-media-link w-inline-block">
              <img src={data.footer_facebook}
               loading="lazy" alt="" className="social-media-icon" />
            </a>
          </div>
          <div data-w-id="a91eae88-2cd2-a6a2-03b1-a73f4b02afd9" className="made-container">
            <div className="made-by-azwedo">
              <div className="light-grey">
            {data.footer_made}    <span className="text-gradient-1"></span> by <a href="https://webflow.com/templates/designers/azwedo" target="_blank" className="external-link">{data.footer_external_link_1}</a>
              </div>
            </div>
            <div className="powered-by">
              <div className="light-grey">
                {data.footer_powered} <a href="https://webflow.com" target="_blank" className="external-link">{data.footer_external_link_2}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-flex-container">
          <div className="footer-brand-content">
            <a href="/" data-w-id="a91eae88-2cd2-a6a2-03b1-a73f4b02afe9" aria-current="page" className="footer-logo-link w-inline-block w--current">
              <img src={data.footer_logo}
               alt="" className="footer-image" />
            </a>
            <ul role="list" className="footer-list w-list-unstyled">
              <li className="footer-list-item">
                <a href="/template/style-guide" className="link w-inline-block">
                  <div>{data.footer_item_1}</div>
                </a>
              </li>
              <li className="footer-list-item">
                <a href="/template/change-log" className="link w-inline-block">
                  <div>{data.footer_item_2}</div>
                </a>
              </li>
              <li className="footer-list-item">
                <a href="/template/licensing" className="link w-inline-block">
                  <div>{data.footer_item_3}</div>
                </a>
              </li>
              <li className="footer-list-item">
                <a href="/template/instructions" className="link w-inline-block">
                  <div>{data.footer_item_4}</div>
                </a>
              </li>
              <li className="footer-list-item">
                <a href="mailto:info@website.com?subject=Webflow%20Template%20Contact" className="link w-inline-block">
                  <div>{data.footer_item_5}</div>
                </a>
              </li>
            </ul>
          </div>
          <div data-w-id="a91eae88-2cd2-a6a2-03b1-a73f4b02b005" className="footer-copyright">
            <div>{data.footer_item_6}</div>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
