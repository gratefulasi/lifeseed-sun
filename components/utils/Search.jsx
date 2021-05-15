import { useLazyQuery } from '@apollo/client';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import { useRouter } from 'next/dist/client/router';

const SEARCH_PRESENTS_QUERY = gql`
  query SEARCH_PRESENTS_QUERY($searchTerm: String!) {
    searchTerms: allPresents(
      where: {
        OR: [{ name_contains_i: $searchTerm }, { body_contains_i: $searchTerm }]
      }
    ) {
      id
      name
      image
    }
  }
`;

// const glow = keyframes`
//   from {
//     box-shadow: 0 0 0px yellow;
//   }

//   to {
//     box-shadow: 0 0 10px 1px yellow;
//   }
// `;

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
  dropDown: {
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  dropDownItem: {
    borderBottom: '1px solid #e3e3e3',
    background: 'white',
    padding: '1rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    borderLeft: '7px solid',
    '& img': {
      marginRight: '10px',
    },
  },
  search: {
    position: 'relative',
    '& input': {
      width: '100%',
      padding: '10px',
      border: 0,
      fontSize: '1rem',
      '& .loading': {
        animation: '${glow} 0.5s ease-in-out infinite alternate',
      },
    },
  },
}));

export default function Search() {
  const classes = useStyles();
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRESENTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      console.log('Input changed');
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/present/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || '',
  });
  return (
    <Box className={classes.search}>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Find',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <Box className={classes.dropDown} {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <Box
              className={classes.dropDownItem}
              key={item.id}
              // TODO highlight
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              <img src={item.image} alt={item.name} width="50" />
              {item.name}
            </Box>
          ))}
        {isOpen && !items.length && !loading && (
          <Box className={classes.dropDownItem}>
            Sorry, no items found for {inputValue}
          </Box>
        )}
      </Box>
    </Box>
  );
}
