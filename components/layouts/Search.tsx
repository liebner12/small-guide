import algoliasearch from 'algoliasearch';
import { Hits, InstantSearch } from 'react-instantsearch-dom';
import { CustomSearchBox } from '../elements/SearchBar';
import SearchResult from '../elements/SearchResult/SearchResult';

const searchClient = algoliasearch(
  process.env.ALGOLIA_ID!,
  process.env.ALGOLIA_KEY!
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
