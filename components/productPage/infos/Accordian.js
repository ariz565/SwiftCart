import * as React from "react";
import { styled } from "@mui/material/styles";
import { BiRightArrow } from "react-icons/bi";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import styles from "./styles.module.scss";
import Share from "./share";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import SimillarSwiper from "./SimillarSwiper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  background: "transparent",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<BiRightArrow sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Accordian({ details, product }) {
  const url = window.location.href;
  const [expanded, setExpanded] = React.useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className={styles.infos__accordian}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={styles.accordian}
      >
        <AccordionSummary
          className={styles.accordian__summary}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          Details
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.infos__accordian_grid}>
            <p>{details[0]}</p>
          </div>
        </AccordionDetails>
        <AccordionDetails className="scrollbar">
          {details.slice(1, details.length).map((info, index) => (
            <div key={index} className={styles.infos__accordian_grid}>
              <span>{info.name}:</span>
              <span>{info.value}</span>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className={styles.accordian}
      >
        <AccordionSummary
          className={styles.accordian__summary}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          Size & Fit
        </AccordionSummary>
        <AccordionDetails>
          <table className={styles.sizes}>
            <thead>
              <tr>
                <th scope="col">Size</th>
                <th scope="col">Chest</th>
                <th scope="col">Neek</th>
                <th scope="col">Sleev</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Small</td>
                <td>36-38&quot;</td>
                <td>14-14.5&quot;</td>
                <td>32.5&quot;</td>
              </tr>
              <tr>
                <td>Medium</td>
                <td>39-41&quot;</td>
                <td>15-15.5&quot;</td>
                <td>33.5&quot;</td>
              </tr>
              <tr>
                <td>Large</td>
                <td>42-44&quot;</td>
                <td>16-16.5&quot;</td>
                <td>34.5&quot;</td>
              </tr>
            </tbody>
          </table>
        </AccordionDetails>
        <AccordionDetails>
          <div className={styles.infos__accordian_grid}></div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        className={styles.accordian}
      >
        <AccordionSummary
          className={styles.accordian__summary}
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          Share this product
        </AccordionSummary>

        <AccordionDetails>
          <div className={styles.button_wrapper}>
            <button
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("Copied product link successfully!");
              }}
            >
              <FaCopy /> Click here to get Product Link
            </button>
          </div>
        </AccordionDetails>
        <AccordionDetails className="scrollbar">
          <div className={styles.socials_share}>
            <span>
              <FaShareAlt /> Share on Socials
            </span>
          </div>
          <Share />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        className={styles.accordian}
      >
        <AccordionSummary
          className={styles.accordian__summary}
          aria-controls="panel4d-content"
          id="panel4d-header"
        >
          Similar products
        </AccordionSummary>
        <AccordionDetails className="scrollbar">
          <SimillarSwiper />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
