.PHONY: build
build-serve:
	#
	rm -rf build;
	mkdir -p build/packages/{etc,api};
	cp ./tsconfig.prod.json build/tsconfig.json
	cp -f ./package.json build/package.json
	cp -rf packages/etc/{package.json,internal} build/packages/etc
	cp -rf packages/api/{package.json,internal} build/packages/api
	cd ./packages/scripts; yarn post-build;
	cd build; npx tsc;
