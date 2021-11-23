import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import Toc from './toc';
import Heading from './Heading';

const MarkDownParser = ({ content }) => (
  <>
    <Toc content={content} />
    {compiler(content, {
      wrapper: null,
      overrides: {
        h1: {
          component: Heading.H1,
          props: {
            className: 'foo',
          },
        },
        h2: {
          component: Heading.H2,
          props: {
            className: 'foo',
          },
        },
        h3: {
          component: Heading.H3,
          props: {
            className: 'foo',
          },
        },
        h4: {
          component: Heading.H4,
          props: {
            className: 'foo',
          },
        },
        h5: {
          component: Heading.H5,
          props: {
            className: 'foo',
          },
        },
        h6: {
          component: Heading.H6,
          props: {
            className: 'foo',
          },
        },
      },
      slugify: (str) => str.split(' ').join('-').toLowerCase(),
    })}
  </>
);

MarkDownParser.propTypes = {
  content: PropTypes.string,
};
MarkDownParser.defaultProps = {
  content: '',
};

export default MarkDownParser;
