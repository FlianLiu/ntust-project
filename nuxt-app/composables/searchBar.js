export function useSearchBar() {
  function searchTag(tag) {
    const searchBar = useState('search-bar', ()=> tag);
    const searchKeyWords = searchBar.value.split(' ');
    let isExist = false;
    for (let i=0; i<searchKeyWords.length; i++) {
      if (searchKeyWords[i] == tag) isExist = true; 
    }
    if (searchKeyWords.length >=3) isExist = true;
    const offset = searchKeyWords[0] === ''? searchBar.value : ( searchBar.value + ' ' );
    searchBar.value = isExist? searchBar.value : ( offset + tag );
  }

  return { searchTag }
}