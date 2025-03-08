import React, { useState } from "react";
import pluralize from "pluralize";

// Utils
import { icons } from "../../utils/use-icon";

// Styles
import "./accordion.scss";

interface itemType {
  title: string;
  overview: any;
  episode_count?: string;
}

interface Props {
  items: itemType[];
  label: string;
  reversed?: boolean;
}

const Accordion: React.FC<Props> = ({ label, items, reversed = false }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const updateOpenItems = (e, index: number) => {
    e.preventDefault();
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <ul
      className="accordion"
      role="menu"
      data-testid="accordion"
    >
      {items.map((item: any, index: number) => {
        const isOpen = openItems.includes(index);
        if (!item.overview) return false;
        return (
          <li
            className="accordion__item"
            role="none"
            key={`accordion-${label}-${index}`}
            data-testid="accordion-item"
          >
            <a
              className={`accordion__trigger${isOpen ? " accordion__trigger--open" : ""}${reversed ? " accordion__trigger--reversed" : ""}`}
              href="#"
              onClick={(e) => {
                updateOpenItems(e, index);
              }}
              role="menuitem"
              aria-expanded={isOpen}
              data-testid="accordion-trigger"
            >
              <span
                className="accordion__title"
                data-testid="accordion-title"
              >
                {item.name}
              </span>
              {item?.episode_count && (
                <span
                  className="accordion__title-episodes"
                  data-testid="accordion-title-episodes"
                >
                  ({item.episode_count} {pluralize("Episodes", item.episode_count)})
                </span>
              )}

              <span
                className="accordion__icon"
                data-testid="accordion-icon"
              >
                {icons.chevronDown}
              </span>
            </a>
            <div
              className={`accordion__inner${isOpen ? " accordion__inner--open" : ""}`}
              data-testid="accordion-inner"
            >
              <p>{item.overview}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Accordion;
