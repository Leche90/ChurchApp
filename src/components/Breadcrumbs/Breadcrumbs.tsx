import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumbs.css';

export interface BreadcrumbItem {
  /** Display label for the breadcrumb */
  label: string;
  /** Route to link to. Omit for the current page (last item). */
  to?: string;
}

interface BreadcrumbsProps {
  /** Array of crumbs in order from root to current page. The last item should typically not have a `to` prop. */
  items: BreadcrumbItem[];
  /** 'light' = for use on light/cream backgrounds. 'dark' = for use on charcoal/black backgrounds. Default: 'light'. */
  theme?: 'light' | 'dark';
  /** Show home icon at the start instead of "Home" text */
  showHomeIcon?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  theme = 'light',
  showHomeIcon = false,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      className={`breadcrumbs breadcrumbs-${theme}`} 
      aria-label="Breadcrumb"
    >
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li
              key={`${item.label}-${index}`}
              className={`breadcrumbs-item ${isLast ? 'is-current' : ''}`}
            >
              {item.to && !isLast ? (
                <Link to={item.to} className="breadcrumbs-link">
                  {isFirst && showHomeIcon ? (
                    <Home size={13} className="breadcrumbs-home-icon" />
                  ) : (
                    item.label
                  )}
                </Link>
              ) : (
                <span 
                  className="breadcrumbs-current"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight 
                  size={12} 
                  className="breadcrumbs-separator" 
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;