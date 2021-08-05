const _createLayout=()=>{
    const main=document.createElement('div');
    main.classList.add('main');
    document.body.appendChild(main);

    const left=document.createElement('div');
    left.classList.add('boxleft');
    main.appendChild(left);

    const right=document.createElement('div');
    right.classList.add('boxright');
    main.appendChild(right);

    const searchBox=document.createElement('div');
    searchBox.classList.add('searchBox');
    right.appendChild(searchBox);


    _search(searchBox);
    _searchButton(searchBox);

    setTimeout(function(){
        searchBox.style.opacity=1;
0
    },500);

}

const _search=(parent)=>{
    const search=document.createElement('input');
    search.type='search';
    search.placeholder='Location...'
    parent.appendChild(search);

}

const _searchButton=(parent)=>{
    const button=document.createElement('button');
    button.classList.add('button');

    const i=document.createElement('i');
    i.classList.add('fa','fa-search');
    button.appendChild(i);
    parent.appendChild(button);

}

export {_createLayout}





