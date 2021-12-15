import algoliasearch from 'algoliasearch';
import { Hits, InstantSearch } from 'react-instantsearch-dom';
import { CustomSearchBox } from '../elements/SearchBar';
import SearchResult from '../elements/SearchResult/SearchResult';

const searchClient = algoliasearch(
  'CVA37N2JF9',
  '54ba98bd9820564c1e9c6a1f4d925c31'
);

const SearchLayout = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="SmallGuide">
      <CustomSearchBox />
      <div className="w-full p-4">
        <Hits hitComponent={SearchResult} />
      </div>
    </InstantSearch>
  );
};

export default SearchLayout;
