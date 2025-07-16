#!/bin/bash

echo "=== GitHub Pages Custom Domain Validation ==="
echo "Date: $(date)"
echo ""

echo "1. Checking CNAME file exists and has correct content:"
if [ -f "public/CNAME" ]; then
    echo "✅ CNAME file exists"
    echo "   Content: $(cat public/CNAME)"
else
    echo "❌ CNAME file not found"
fi
echo ""

echo "2. Testing custom domain accessibility (HTTPS):"
CUSTOM_DOMAIN_STATUS=$(curl -I -s -o /dev/null -w "%{http_code}" https://bvelastegui.dev)
if [ "$CUSTOM_DOMAIN_STATUS" = "200" ]; then
    echo "✅ Custom domain accessible (HTTP $CUSTOM_DOMAIN_STATUS)"
else
    echo "❌ Custom domain not accessible (HTTP $CUSTOM_DOMAIN_STATUS)"
fi
echo ""

echo "3. Testing SSL certificate:"
SSL_RESULT=$(curl -I -s -o /dev/null -w "%{ssl_verify_result}" https://bvelastegui.dev)
if [ "$SSL_RESULT" = "0" ]; then
    echo "✅ SSL certificate is valid"
else
    echo "❌ SSL certificate validation failed (code: $SSL_RESULT)"
fi
echo ""

echo "4. Testing GitHub Pages URL redirect:"
GITHUB_PAGES_STATUS=$(curl -I -s -o /dev/null -w "%{http_code}" https://bvelastegui.github.io/bvelastegui.dev)
if [ "$GITHUB_PAGES_STATUS" = "301" ]; then
    echo "✅ GitHub Pages URL redirects correctly (HTTP $GITHUB_PAGES_STATUS)"
    REDIRECT_LOCATION=$(curl -I -s https://bvelastegui.github.io/bvelastegui.dev | grep -i location | cut -d' ' -f2 | tr -d '\r')
    echo "   Redirect location: $REDIRECT_LOCATION"
else
    echo "❌ GitHub Pages URL redirect not working (HTTP $GITHUB_PAGES_STATUS)"
fi
echo ""

echo "5. Testing DNS resolution:"
DNS_RESULT=$(getent hosts bvelastegui.dev)
if [ $? -eq 0 ]; then
    echo "✅ DNS resolution working"
    echo "   IP addresses:"
    echo "$DNS_RESULT" | while read ip domain; do
        echo "   - $ip"
    done
else
    echo "❌ DNS resolution failed"
fi
echo ""

echo "6. Testing site content loading:"
CONTENT_CHECK=$(curl -s https://bvelastegui.dev | head -1)
if [[ "$CONTENT_CHECK" == *"<!DOCTYPE html>"* ]]; then
    echo "✅ Site content loading correctly"
    echo "   First line: $CONTENT_CHECK"
else
    echo "❌ Site content not loading properly"
fi
echo ""

echo "7. Testing asset paths for custom domain:"
ASSET_CHECK=$(curl -s https://bvelastegui.dev | grep -o '/_astro/[^"]*' | head -3)
if [ -n "$ASSET_CHECK" ]; then
    echo "✅ Assets using correct root path (no base URL for custom domain)"
    echo "   Sample asset paths:"
    echo "$ASSET_CHECK" | while read asset; do
        echo "   - $asset"
    done
else
    echo "❌ Assets not using correct root path"
fi
echo ""

echo "8. Testing asset accessibility:"
SAMPLE_ASSET=$(curl -s https://bvelastegui.dev | grep -o '/_astro/[^"]*\.css' | head -1)
if [ -n "$SAMPLE_ASSET" ]; then
    ASSET_STATUS=$(curl -I -s -o /dev/null -w "%{http_code}" "https://bvelastegui.dev$SAMPLE_ASSET")
    if [ "$ASSET_STATUS" = "200" ]; then
        echo "✅ Sample asset accessible (HTTP $ASSET_STATUS)"
        echo "   Tested: $SAMPLE_ASSET"
    else
        echo "❌ Sample asset not accessible (HTTP $ASSET_STATUS)"
    fi
else
    echo "❌ No assets found to test"
fi
echo ""

echo "=== Validation Complete ==="