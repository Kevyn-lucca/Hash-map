function ControlHash() {
	const buckets = [];
	const size = 16; // Number of buckets

	function CreateHash(key) {
		let hashCode = 0;
		const primeNumber = 31;

		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}
		return Math.abs(hashCode) % size;
	}

	function set(key, value) {
		const index = CreateHash(key);
		if (!buckets[index]) {
			buckets[index] = [];
		}
		buckets[index].push({ key, value });
	}

	function get(key) {
		const index = CreateHash(key);
		const bucket = buckets[index];
		if (bucket) {
			for (let i = 0; i < bucket.length; i++) {
				if (bucket[i].key === key) {
					return bucket[i].value;
				}
			}
		}
		return undefined; // Key not found
	}

	function remove(key) {
		const index = CreateHash(key);
		const bucket = buckets[index];
		if (bucket) {
			for (let i = 0; i < bucket.length; i++) {
				if (bucket[i].key === key) {
					bucket.splice(i, 1);
					return true;
				}
			}
		}
		return false; // Key not found
	}

	return {
		set,
		get,
		remove,
	};
}

const hashTable = ControlHash();
hashTable.set("name", "Kevyn Lucca");
console.log(hashTable.get("name")); // Output: Kl
