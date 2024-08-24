// import React from "react";
// import classNameNames from "classNamenames";

// const SearchBar = ({ classNameName, options, ...props }) => {
//   return (
//     <select classNameName={classNameNames(classNameName, "form-select")}>
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default SearchBar;

import React from 'react'
import "./SearchBar.css"
const SearchBar = () => {


  return (
    <div>
      <form className="ps-form--quick-search" action="#">
				<div className="form-group--icon">
					<i className="icon-chevron-down"></i>
					<select className="form-control w-auto" name="filter" fdprocessedid="11bk9q">
						<option value="0" selected="selected">All</option>
						<option className="level-0" value="kategori|9">Watches</option>
						<option className="level-1" value="subkategori|21">- Rolex</option>
						<option className="level-1" value="subkategori|22">- fastrack</option>
						<option className="level-1" value="subkategori|23">- Sonata</option>

						<option className="level-0" value="kategori|6">Women Clothes</option>
						<option className='level-1' value='subkategori|14'>- Accessories</option>
						<option className='level-1' value='subkategori|15'>- Kid's Fashion</option>
						<option className='level-1' value='subkategori|16'>- Shoes</option>

						<option className='level-0' value='kategori|2'>Fashion & Busana Wanita</option>
						<option className='level-1' value='subkategori|2'>- Kiyora Dalam</option>
						<option className='level-1' value='subkategori|1'>- Kiyora Sedang</option>

						<option className="level-0" value="kategori|13">Bags</option>
						<option className="level-1" value="subkategori|11">- Freezer Burn</option>
						<option className="level-1" value="subkategori|12">- Frigde Cooler</option>
						<option className="level-1" value="subkategori|13">- Wine Cabinets</option>

						<option className="level-0" value="kategori|1">Men clothes</option>
						<option className="level-1" value="subkategori|6">- Cincin</option>
						<option className="level-1" value="subkategori|4">- Jam tangan</option>
						<option className="level-1" value="subkategori|3">- Kalung</option>
						<option className="level-1" value="subkategori|24">- sdasd</option>

						<option className="level-0" value="kategori|12">Shoes</option>
						<option className="level-1" value="subkategori|20">- Cincin Kawin</option>
						<option className="level-1" value="subkategori|19">- Emas Putih</option>


						<option className="level-0" value="kategori|14">Toys &amp; Hobbies</option>
						<option className='level-1' value='subkategori|7'>- Cookware</option>
						<option className='level-1' value='subkategori|8'>- Decoration</option>
						<option className='level-1' value='subkategori|9'>- Furniture</option>
						<option className='level-1' value='subkategori|10'>- Garden Tools</option>

						<option className='level-0' value='kategori|10'>Tas, Koper & Perjalanan</option>
						<option className='level-1' value='subkategori|17'>- Car Electronics</option>
						<option className='level-1' value='subkategori|18'>- Office Electronics</option> 
					</select>
				</div>
				<input className="form-control" name="kata" type="text" placeholder="I want to go shopping..." autocomplete="off" required="" fdprocessedid="63pec"/>
				<button type="submit" name="Search" fdprocessedid="laylg">Search</button>
			</form>
    </div>
  )
}

export default SearchBar

